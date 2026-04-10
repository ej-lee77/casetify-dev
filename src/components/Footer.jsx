import React from 'react'
import "./scss/Footer.scss"
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer>
        <div className="inner">
          <div className="footer-left">
            <div className="casetify-15th-anniversary">
              <Link>
                <img src="./images/header-footer/casetify-15th-icon.png" alt="casetify-15th-icon" />
                <span>CASETIFY: 15 for 15<br />15년의 여정</span>
              </Link>
            </div>
            <div className="sns-list-wrap">
              <p>케이스티파이를 팔로우 해주세요!</p>
              <ul className="sns-list">
                <li><Link><img src="./images/header-footer/sns_instagram.png" alt="인스타그램" /></Link></li>
                <li><Link><img src="./images/header-footer/sns_facebook.png" alt="페이스북" /></Link></li>
                <li><Link><img src="./images/header-footer/sns_twitter.png" alt="인스타그램" /></Link></li>
                <li><Link><img src="./images/header-footer/sns_pinterest.png" alt="핀터레스트" /></Link></li>
                <li><Link><img src="./images/header-footer/sns_tiktok.png" alt="틱톡" /></Link></li>
              </ul>
            </div>
            <div className="app-info-wrap">
              <div className="mobile-app-colab">
                <img src="./images/app-icon-colab.png" alt="App-Colab" />
                <div className="text-area">
                  <span>CASETIFY Colab</span>
                  <p>독점 콜라보제품 구매하기</p>
                </div>
                <ul className="app-store-bedge">
                  <li><Link><img src="./images/header-footer/badge_getapp_apple.svg" alt="" /></Link></li>
                </ul>
              </div>
              <div className="mobile-app">
                <img src="./images/app-icon.png" alt="App-Offical" />
                <div className="text-area">
                  <span>CASETIFY</span>
                  <p>나만의 커스텀 케이스 만들기</p>
                </div>
                <ul className="app-store-bedge">
                  <li><Link><img src="./images/header-footer/badge_getapp_apple.svg" alt="" /></Link></li>
                  <li><Link><img src="./images/header-footer/badge_getapp_google.svg" alt="" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <div className="company-info">
              <p className="title">회사소개</p>
              <ul className="info-list">
                <li>케이스티파이 : 케이스타그램 리미티드(Casetify: Casetagram Limited)</li>
                <li>케이스티파이 유한회사 (CASETiFY)</li>
                <li>대표: 응푸이순 웨슬리 (Wesley Ng)</li>
                <li>사업자등록번호: 580-88-02026</li>
                <li>통신판매업 신고번호: 제 2021-서울강남-03049 호</li>
                <li>주소: 서울 강남구 영동대로 616 아남빌딩 2층, 케이스티파이</li>
              </ul>
              <ul className="payment">
                <li><img src="./images/icon/payment_visa.svg" alt="결제수단:VISA" /></li>
                <li><img src="./images/icon/payment_mastercard.svg" alt="결제수단:Master Card" /></li>
                <li><img src="./images/icon/payment_AMEX.svg" alt="결제수단:AMEX" /></li>
                <li><img src="./images/icon/payment_apple-pay.svg" alt="결제수단:Apple Pay" /></li>
                <li><img src="./images/icon/payment_kakao-pay.svg" alt="결제수단:카카오페이" /></li>
                <li><img src="./images/icon/payment_naver-pay.svg" alt="결제수단:네이버페이" /></li>
              </ul>
              <p className="remark"><span>개인정보처리방침</span><span>약관</span></p>
              <p>Copyright © 2026 CASETiFY</p>
            </div>
            <div className="cs-info">
              <p className="title">CS Center</p>
              <ul className="contact-list">
                <li>hello@casetify.com</li>
                <li>1833-6292</li>
                <li>토요일, 일요일, 공휴일 휴무</li>
              </ul>
              <ul className="cs-menu-list">
                <li><Link>문의하기</Link></li>
                <li><Link>FAQs</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-title">
          <p>Show Your Colors CASETIFY</p>
        </div>
      </footer>
      <div className="top-btn">
        <img src="./images/icon/icon-top-btn.svg" alt="top" />
        <p>TOP</p>
      </div>
    </>
  )
}
