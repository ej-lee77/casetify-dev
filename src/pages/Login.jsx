import React from 'react'
import "./scss/Login.scss"
import FormInput from '../components/sub/FormInput'
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='sub-page-wrap login-wrap'>
      <div className="inner">
        <SectionTitle title={"로그인"} subtitle={""} />
        <FormInput inputType={'email'} label={'이메일'} required={'required'}/>
        <FormInput inputType={'password'} label={'비밀번호'} required={'required'}/>
        <div class="login-check">
            <input type="checkbox" id="login-idcheck" class="login-idcheck screen-reader"/>
            <div class="label-box">
                <span class="check-icon" aria-hidden="true"></span>
                <label for="login-idcheck">아이디 저장</label>
            </div>
        </div>
        <button>로그인하기</button>
        <div className='login-option'>
          <div><Link>아이디 찾기</Link></div>
          <div><Link>비밀번호 찾기</Link></div>
          <div><Link>회원가입</Link></div>
        </div>
        <p>또는</p>
        <div>
          <p>간편로그인으로 1초 회원가입</p>
          <div className='login-sns'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
