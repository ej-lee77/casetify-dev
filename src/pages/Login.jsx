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
        <div className="login-check">
            <input type="checkbox" id="login-idcheck" className="login-idcheck screen-reader"/>
            <div className="label-box">
                <span className="check-icon" aria-hidden="true"></span>
                <label htmlFor="login-idcheck">아이디 저장</label>
            </div>
        </div>
        <button>로그인하기</button>
        <div className='login-option'>
          <div><Link>아이디 찾기</Link></div>
          <div><Link>비밀번호 찾기</Link></div>
          <div><Link>회원가입</Link></div>
        </div>
        <p className='or-line'>또는</p>
        <div className='login-sns-box'>
          <p>간편로그인으로 1초 회원가입</p>
          <div className='login-sns'>
            <div><img src="/images/login/sns_btn_google.png" alt="google login" /></div>
            <div><img src="/images/login/sns_btn_kakao.png" alt="kakao login" /></div>
            <div><img src="/images/login/sns_btn_naver.png" alt="naver login" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
