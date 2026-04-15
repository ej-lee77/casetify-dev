import React, { useState } from 'react'
import "./scss/Login.scss"
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {onLogin, onGoogleLogin} = useAuthStore();

    // 로그인하면 첫화면으로 이동하기
    const navigate = useNavigate();

    // 기본 로그인
    const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log("이메일 로그인");
      const isLogin = await onLogin(email, password);

      if(isLogin){
        // 로그인되면 첫화면으로 이동
        navigate("/");
      }
    }

    // 구글 로그인
    const handleGoogleLogin = ()=>{
      console.log("구글 로그인");
      onGoogleLogin();

      // 로그인되면 첫화면으로 이동
      navigate("/");
    }

    // 카카오 로그인
    const handleKakaoLogin = ()=>{
      console.log("카카오 로그인");
    }
  return (
    <div className='login-wrap'>
      <div className="inner">
        <SectionTitle title={"로그인"} subtitle={""} />
        <form onSubmit={handleSubmit}>
          <div className='input-div'>
              <input type="email" name="email" id='email' required="required" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email" placeholder=""/>
              <label htmlFor='email'>이메일</label>
              <span></span>
          </div>
          <div className='input-div'>
              <input type="password" name="password" id='password' required="required" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder=""/>
              <label htmlFor='password'>비밀번호</label>
              <span></span>
          </div>
          <div className="login-check">
              <input type="checkbox" id="login-idcheck" className="login-idcheck screen-reader"/>
              <div className="label-box">
                  <span className="check-icon" aria-hidden="true"></span>
                  <label htmlFor="login-idcheck">아이디 저장</label>
              </div>
          </div>
          <button>로그인하기</button>
        </form>
        <div className='login-option'>
          <div><Link>아이디 찾기</Link></div>
          <div><Link>비밀번호 찾기</Link></div>
          <div><Link to="/join">회원가입</Link></div>
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
