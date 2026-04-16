import React, { useState } from 'react'
import "./scss/Login.scss"
import SectionTitle from '../components/SectionTitle'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import AddressSearch from '../components/sub/AddressSearch'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

export default function Join() {
    const {onMember} = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        birthDate: new Date(),
        zonecode: "",
        address: "",
        detailaddress: ""
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [passValidError, setPassValidError] = useState('');
    
    const setAddressData = (data) => {
        setFormData((prev) => ({
        ...prev,
        zonecode: data.zonecode,
        address: data.address,
        }));
    };

    // 각각 입력한 input요소를 name속성으로 찾아서 값 변경시키기
    const handleChange = (e)=>{
        const {name, value} = e.target;
        // console.log(name, value);
        setFormData({...formData, [name]:value});

        if (name === 'password') {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
            if (!passwordRegex.test(value)) {
                setPassValidError("영문, 숫자를 포함한 6~12자로 입력해주세요.");
            } else {
                setPassValidError(""); // 조건 만족 시 에러 메시지 제거
            }
        }
    }

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            birthDate: date
        }));
    };

    // 회원가입 전송
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const isJoin = await onMember(formData);

        if(isJoin){
            // 회원가입되면 첫화면으로 이동
            navigate("/");
        }
    }

    // 비밀번호 변경 시마다 실시간 체크
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        
        if (formData.password !== value) {
        setPassError("비밀번호가 일치하지 않습니다.");
        } else {
        setPassError(""); // 일치하면 에러 메시지 제거
        }
    };

  return (
    <div className='login-wrap join-wrap'>
        <div className="inner">
            <form onSubmit={handleSubmit}>
                <SectionTitle title={"회원가입"} subtitle={""}/>
                <div>
                    <div className='input-box line-b'>
                        <div className='label-div'><label htmlFor='username'>이름</label></div>
                        <div className='input-div'><input type="text" id='username' name='username' placeholder='이름을 입력하세요' onChange={handleChange}/></div>
                    </div>
                    <div className='input-box line-b'>
                        <div className='label-div'><label htmlFor='email'>이메일</label></div>
                        <div className='input-div'><input type="email" id='email' name='email' placeholder='casetifyuser@casetify.com' onChange={handleChange}/></div>
                    </div>
                    <div className='line-b'>
                        <div className='input-box'>
                            <div className='label-div'><label htmlFor='password'>비밀번호</label></div>
                            <div className='input-div'>
                                <input type="password" id='password' name='password'placeholder='비밀번호' onChange={handleChange}/>
                                <p className='err-box'>{passValidError}</p>
                            </div>
                        </div>
                        <div className='input-box'>
                            <div className='label-div'><label htmlFor='passwordcon'>비밀번호 확인</label></div>
                            <div className='input-div'>
                                <input type="password" id='passwordcon' value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="비밀번호 확인" />
                                <p className='err-box'>{passError}</p>
                            </div>
                        </div>
                    </div>
                    <div className='line-b'>
                        <div className='input-box'>
                            <div className='label-div'><label htmlFor='phone'>휴대전화</label></div>
                            <div className='input-div'><input type="text" id='phone' name='phone' placeholder='-없이 입력' onChange={handleChange}/></div>
                        </div>
                        <div className='input-box'>
                            <div className='label-div'><label>생년월일</label></div>
                            <DatePicker
                                selected={formData.birthDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100} // 100년 범위 선택 가능
                                maxDate={new Date()}    // 오늘 이후 날짜 선택 불가
                                locale={ko}             // 한국어 적용
                                placeholderText="생년월일을 선택해주세요"
                            />
                        </div>
                    </div>
                    <div className='input-box line-b'>
                        <div className='label-div'><label htmlFor='detailaddress'>주소</label></div>
                        <div className='input-div'>
                            <input value={formData.zonecode} readOnly placeholder="우편번호" />
                            <AddressSearch setAddressData={setAddressData} />
                            <input value={formData.address} readOnly placeholder="기본주소" />
                            <input type="text" id='detailaddress' name='detailaddress' placeholder="상세주소" onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <button className='input-btn'>회원가입하기</button>
            </form>
        </div>
    </div>
  )
}
