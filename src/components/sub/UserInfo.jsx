import React, { useEffect, useState } from 'react'
import MypageTitle from './MypageTitle'
import "./scss/UserInfo.scss"
import { useAuthStore } from '../../store/useAuthStore'
import AddressSearch from './AddressSearch';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
    const Navigate = useNavigate();
    const { user, onUpdateUser, onDeleteUser, onLogout } = useAuthStore();
    // console.log("현재 user:", user);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        zonecode: "",
        address: "",
        detailaddress: ""
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
            setFormData({
                email: user.email || '',
                name: user.name || '',
                phone: user.phone || '',
                zonecode: user.zonecode || '',
                address: user.address || '',
                detailaddress: user.detailaddress || ''
            });
        }
    }, [user]);
    const handleSave = async () => {
        const result = await onUpdateUser(formData);

        if (result) {
            alert("회원정보가 수정되었습니다 👍");
        } else {
            alert("저장 실패 😢");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말 계정을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        const result = await onDeleteUser();

        if (result === true) {
            alert("계정이 삭제되었습니다");
            //바로 이어서 실행
            const isLogout = await onLogout();

            if (isLogout) {
                Navigate("/");
            }
        } else if (result === "auth/requires-recent-login") {
            alert("보안을 위해 다시 로그인 후 삭제해주세요");
        } else {
            alert("삭제 실패");
        }
    };
    // const handleDeleteUser = async () => {
    //     const isLogout = await onLogout();

    //     if (isLogout) {
    //         navigate("/");
    //     }
    // }

    return (
        <div>
            <MypageTitle title={"회원 카드"} />
            <div className='user-card-wrap'>
                <div className="user-card">
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
                <img src="./images/userinfo/user-download.png" alt="" />
            </div>

            <MypageTitle title={"계정 정보"} />
            <div className="acount-info">
                <form>
                    <p>
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
                    </p>
                    <p>
                        <label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder=''
                            />
                            <span>전화번호</span></label>
                    </p>
                    {!user?.provider && (
                        <div className="password-wrap">
                            <p>
                                <label><input type="password" placeholder='' /><span>사용 중인 비밀번호</span></label>
                            </p>
                            <p>
                                <label><input type="password" placeholder='' /><span>새 비밀번호</span></label>
                                <label><input type="password" placeholder='' /><span>비밀번호 확인</span></label>
                            </p>
                        </div>
                    )}
                </form>
            </div >
            {!user?.provider && (
                <div className='pass-notice'>
                    <p>비밀번호는 다음 조건을 충족해야 합니다.</p>
                    <p>8~36자 사이<br />
                        하나 이상의 대문자 포함<br />
                        하나 이상의 숫자 포함</p>
                </div>
            )}
            <MypageTitle title={"배송 주소"} />
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
