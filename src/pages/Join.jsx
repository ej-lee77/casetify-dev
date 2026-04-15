import React, { useState } from 'react'
import "./scss/Login.scss"
import SectionTitle from '../components/SectionTitle'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function Join() {
    const {onMember} = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        address1: "",
        address2: "",
        address3: ""
    });

    // 각각 입력한 input요소를 name속성으로 찾아서 값 변경시키기
    const handleChange = (e)=>{
        const {name, value} = e.target;
        // console.log(name, value);
        setFormData({...formData, [name]:value});
    }

    // 회원가입 전송
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const isJoin = await onMember(formData);

        if(isJoin){
            // 회원가입되면 첫화면으로 이동
            navigate("/");
        }
    }

  return (
    <div className='login-wrap'>
        <div className="inner">
            <form onSubmit={handleSubmit}>
                <SectionTitle title={"회원가입"} subtitle={""}/>
                <input type="email" name='email' placeholder='이메일' onChange={handleChange}/>
                <input type="password" name='password'placeholder='비밀번호 6자리 이상입니다' onChange={handleChange}/>
                <button>회원가입하기</button>
            </form>
        </div>
    </div>
  )
}
