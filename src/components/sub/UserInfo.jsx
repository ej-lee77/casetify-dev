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
        console.log("birthDate 값:", formData.birthDate);
        console.log("birthDate 에러:", validate('birthDate', formData.birthDate));
        // 저장 버튼 클릭 시 전체 필드 일괄 검증
        const newErrors = {
            email: validate('email', formData.email),
            name: validate('name', formData.name),
            phone: validate('phone', formData.phone),
            birthDate: validate('birthDate', formData.birthDate),
        };
        setErrors(newErrors);

        // 하나라도 에러 있으면 저장 중단
        if (Object.values(newErrors).some(e => e !== '')) return;

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
        setFormData((prev) => ({ ...prev, [name]: value }));

        const error = validate(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
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

        // 👇 빈값이면 에러 지우기, 값 있을 때만 검증
        if (!value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
            return;
        }

        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
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

    // 검증
    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error = '';

        if (!value || value.toString().trim() === '') return '필수 입력 항목입니다.';

        if (name === 'email') {
            if (!value.includes('@') || value.trim() === '') error = '이메일 형식이 올바르지 않습니다.';
        }
        if (name === 'phone') {
            const numberRegex = /^[0-9]{10,11}$/;
            if (!numberRegex.test(value) || value.includes('-')) error = '-없이 숫자만 입력해주세요.';
        }
        if (name === 'birthDate') {
            if (!(value instanceof Date) || isNaN(value.getTime())) error = '생년월일을 선택해주세요.';
        }
        if (name === 'newPassword') {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
            if (!passwordRegex.test(value)) error = '영문, 숫자를 포함한 6~12자로 입력해주세요.';
        }
        if (name === 'confirmPassword') {
            if (passwordData.newPassword !== value) error = '비밀번호가 일치하지 않습니다.';
        }
        return error;
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

                <div className='point-card'>
                    <div className='point-card-header'>
                        <span className='title'>CASETiFY Club</span>
                        <img src="./images/icon/info.png" alt="info"
                            className='point-info-icon' />
                    </div>
                    <p className='point-label'>현재 보유 포인트</p>
                    <p className='point-value'>50</p>
                    <p className='point-grade'>브론즈</p>

                    <div className='point-bar-wrap'>
                        <div className='point-bar-labels'>
                            <span>베이직</span>
                            <span>브론즈</span>
                            <span>실버</span>
                            <span>골드</span>
                        </div>
                        <div className='point-bar-track'>
                            <div className='point-bar-fill' />
                            <div className='point-bar-thumb' />
                        </div>
                        <div className='point-bar-numbers'>
                            <span>0</span>
                            <span>50</span>
                            <span>120</span>
                            <span>200</span>
                        </div>
                    </div>

                    <div className='point-bottom'>
                        <div className='point-bottom-item'>
                            <p>실버 등급까지</p>
                            <p className='point-highlight'>70</p>
                            <p>포인트 남았어요!</p>
                        </div>
                        <div className='point-divider' />
                        <div className='point-bottom-item'>
                            <p>실버 등급이 되면</p>
                            <p className='point-highlight'>20% 할인 쿠폰</p>
                            <p>지급!</p>
                        </div>
                    </div>
                </div>
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
                            <span>이메일</span>
                            {errors.email && <p className="error-msg">{errors.email}</p>}
                        </label>
                        <label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder=''
                            />
                            <span>이름</span>
                            {errors.name && <p className="error-msg">{errors.name}</p>}
                        </label>
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
                            {errors.phone && <p className="error-msg">{errors.phone}</p>}
                        </label>
                        <label>

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
                            {errors.birthDate && <p className="error-msg">{errors.birthDate}</p>}
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
                                    <span>새 비밀번호</span>
                                    {errors.newPassword && <p className="error-msg">{errors.newPassword}</p>}
                                </label>
                                <label>
                                    <input type="password" placeholder=''
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange} />
                                    <span>비밀번호 확인</span>
                                    {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
                                </label>
                            </div>
                            {/* <p className='pass-notice'>영문, 숫자를 포함한 6~12자로 입력해주세요</p> */}
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
