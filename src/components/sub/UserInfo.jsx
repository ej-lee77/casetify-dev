import React, { useEffect, useRef, useState } from 'react'
import MypageTitle from './MypageTitle'
import "./scss/UserInfo.scss"
import { useAuthStore } from '../../store/useAuthStore'
import AddressSearch from './AddressSearch';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import AlertPopup from './AlertPopup';
import './scss/AlertPopup.scss';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { p } from 'framer-motion/client';

export default function UserInfo() {
    const Navigate = useNavigate();
    const { user, onUpdateUser, onDeleteUser, onLogout, handleChangePassword } = useAuthStore();
    // console.log("현재 user:", user);
    // console.log("비밀번호:", handleChangePassword)/
    const [alertMsg, setAlertMsg] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        zonecode: "",
        address: "",
        detailaddress: "",
        birthDate: ""
    });
    const setAddressData = (data) => {
        setFormData((prev) => ({
            ...prev,
            zonecode: data.zonecode,
            address: data.address,
        }));
    };

    useEffect(() => {
        if (user) {
            let birthDateObj = user.birthDate ? new Date(user.birthDate) : null;

            setFormData({
                email: user.email || '',
                name: user.name || '',
                phone: user.phone || '',
                zonecode: user.zonecode || '',
                address: user.address || '',
                detailaddress: user.detailaddress || '',
                birthDate: birthDateObj
            });
        }
    }, [user]);

    const handleSave = async () => {
        const saveData = {
            ...formData,
            birthDate: formData.birthDate instanceof Date
                ? `${formData.birthDate.getFullYear()}-${String(formData.birthDate.getMonth() + 1).padStart(2, '0')}-${String(formData.birthDate.getDate()).padStart(2, '0')}`
                : formData.birthDate || ''
        };

        const result = await onUpdateUser(saveData);

        if (result) {
            setAlertMsg("회원정보가 수정되었습니다 👍");
        } else {
            setAlertMsg("저장 실패 😢");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const [onConfirm, setOnConfirm] = useState(null);
    const handleDelete = async () => {
        setAlertMsg("정말 계정을 삭제하시겠습니까?");
        setOnConfirm(() => async () => {
            const result = await onDeleteUser();
            if (result === true) {
                setOnConfirm(null); // 확인 콜백 제거 (취소버튼 없애기)
                setAlertMsg("계정이 삭제되었습니다");
                // Navigate("/") 여기서 바로 이동하지 않음
            } else if (result === "auth/requires-recent-login") {
                setAlertMsg("보안을 위해 다시 로그인 후 삭제해주세요");
            } else {
                setAlertMsg("삭제 실패");
            }
        });
    };

    const cardRef = useRef(null);
    // 다운로드 핸들러 추가
    const handleDownload = async () => {
        if (!cardRef.current) return;

        const canvas = await html2canvas(cardRef.current, {
            scale: 2,           // 고해상도 (2배)
            useCORS: true,      // 외부 이미지 허용
            backgroundColor: null  // 투명 배경 유지
        });

        const link = document.createElement('a');
        link.download = `${formData.name || 'member'}-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    //비밀번호 변경
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handlePasswordSave = async () => {
        if (!passwordData.currentPassword) {
            setAlertMsg("사용 중인 비밀번호를 입력해주세요");
            return;
        }

        const result = await handleChangePassword(passwordData);

        if (result === true) {
            setAlertMsg("비밀번호가 변경되었습니다 👍");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else if (result === "auth/wrong-password") {
            setAlertMsg("현재 비밀번호가 틀렸습니다");
        } else if (result === "auth/requires-recent-login") {
            setAlertMsg("다시 로그인 후 시도해주세요");
        } else {
            setAlertMsg("비밀번호 변경 실패 😢");
        }
    };

    // 생년월일
    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            birthDate: date
        }));
    };


    return (
        <div>
            <AlertPopup
                message={alertMsg}
                onClose={() => {
                    const msg = alertMsg;
                    setAlertMsg("");
                    setOnConfirm(null);
                    if (msg === "계정이 삭제되었습니다") {
                        onLogout().then(() => Navigate("/"));
                    }
                }}
                onConfirm={onConfirm}
            />
            <MypageTitle title={"회원 카드"} />
            <div className='user-card-wrap'>
                <div className="user-card" ref={cardRef}>
                    <div className='user-info1'>
                        <img className="user-card-logo" src="./images/header-footer/casetify-logo.png" alt="로고" />
                        <img className='user-qr' src="./images/userinfo/qr-code.png" alt="큐알" />
                        <div>
                            <p className='title'>MENBER NAME</p>
                            <p className='content'>{formData?.name}</p>
                        </div>
                    </div>
                    <div className='user-info2'>
                        <p className='title'>CASETiFY Club</p>
                        <div className="content-wrap">
                            <span className='content'>Basic</span>
                            <span className='content'>{formData?.email.split('@')[0] || user?.uid}</span>
                        </div>
                    </div>
                </div>
                <img
                    src="./images/userinfo/user-download.png"
                    alt="다운로드"
                    onClick={handleDownload}
                    style={{ cursor: 'pointer' }} />
            </div>

            <MypageTitle title={"계정 정보"} />
            <div className="acount-info">
                <form>
                    <div className='input-p'>
                        <label>
                            <input type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='' />
                            <span>이메일</span></label>
                        <label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder=''
                            />
                            <span>이름</span></label>
                    </div>
                    <div className='input-p'>
                        <label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder=''
                            // className='alone'
                            />
                            <span>전화번호</span>
                        </label>
                        <label>
                            {/* <input
                                type="text"
                                name='birthDate'
                                value={formData.birthDate}
                                onChange={handleChange}
                                placeholder=''
                            /> */}
                            <DatePicker
                                className="datepicker-input"
                                selected={formData.birthDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100} // 100년 범위 선택 가능
                                maxDate={new Date()}    // 오늘 이후 날짜 선택 불가
                                locale={ko}             // 한국어 적용
                                placeholderText=""
                            />
                            <span>생년월일</span>
                        </label>
                    </div>
                    {!user?.provider && (
                        <div className="password-wrap">
                            <div className='input-p'>
                                <label>
                                    <input type="password" placeholder=''
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className='alone' />
                                    <span>사용 중인 비밀번호</span></label>
                            </div>
                            <div className='input-p'>
                                <label>
                                    <input type="password" placeholder=''
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange} />
                                    <span>새 비밀번호</span></label>
                                <label>
                                    <input type="password" placeholder=''
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange} />
                                    <span>비밀번호 확인</span></label>
                            </div>
                            <p className='pass-notice'>영문, 숫자를 포함한 6~12자로 입력해주세요</p>
                            <div className="pass-change-btn">
                                <button type='button' onClick={handlePasswordSave}>비밀번호 변경</button>
                            </div>
                        </div>
                    )}
                </form>
            </div >

            <div className="title-wrap">
                <MypageTitle title={"배송 주소"} />
            </div>
            <div className='address-info'>
                <form>
                    <p className='postcode'>
                        <label ><input type="text" value={formData?.zonecode} readOnly placeholder='우편번호' />
                            <span>우편번호</span>
                            <div className="address-btn">
                                <AddressSearch setAddressData={setAddressData} />
                            </div>
                        </label>
                    </p>
                    <p><label ><input type="text" value={formData?.address} readOnly placeholder='기본주소' />
                        <span>기본주소</span>
                    </label></p>
                    <p><label ><input
                        name="detailaddress"
                        value={formData.detailaddress}
                        onChange={handleChange} placeholder='' />
                        <span className='always'>상세주소</span></label></p>
                </form>
                <div className="btn-wrap">
                    <button type="button" onClick={handleSave}>
                        회원 정보 저장
                    </button>
                </div>
            </div>
            <div className='delete-wrap'>
                <MypageTitle title={"계정 삭제"} />
                <p>주문 정보를 포함한 모든 프로필이 영구적으로 삭제됩니다.</p>
                <p>계정 삭제 후에는 주문 정보 및 케이스티파이 클럽 포인트를 복원할 수 없습니다</p>
                <button onClick={handleDelete}>내 계정 삭제</button>
            </div>
        </div >
    )
}
