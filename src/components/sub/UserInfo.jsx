import React from 'react'
import MypageTitle from './MypageTitle'
import "./scss/UserInfo.scss"

export default function UserInfo() {
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
                            <p className='content'>Lee Eunji</p>
                        </div>
                    </div>
                    <div className='user-info2'>
                        <p className='title'>CASETiFY Club</p>
                        <span className='content'>Basic</span>
                        <span className='content'>000 022 156</span>
                    </div>
                </div>
                <img src="./images/userinfo/user-download.png" alt="" />
            </div>
            <MypageTitle title={"계정 정보"} />
            <div className="">
                <form action="">
                    <p>
                        <label><span>이메일 주소</span><input type="text" /></label>
                        <label><span>Lee Eunji</span><input type="text" /></label>
                    </p>
                    <p>
                        <label><span>전화번호</span><input type="text" /></label>
                    </p>
                    <p>
                        <label><span>사용 중인 비밀번호</span><input type="text" /></label>
                    </p>
                    <p>
                        <laebel><span>새 비밀번호</span><input type="text" /></laebel>
                        <label><span>비밀번호 확인</span><input type="text" /></label>
                    </p>
                </form>
            </div >
            <MypageTitle title={"배송 주소"} />
            <div className='address'>
                <form action="">
                    <p>
                        <label ><span>우편번호</span><input type="text" /><button>주소 찾기</button>
                        </label>
                    </p>
                    <p><label ><span>기본주소</span><input type="text" /></label></p>
                    <p><label ><span>상세 주소</span><input type="text" /></label></p>
                </form>
                <button>회원 정보 저장</button>
            </div>
            <MypageTitle title={"계정 삭제"} />
            <div>
                <p>주문 정보를 포함한 모든 프로필이 영구적으로 삭제됩니다.</p>
                <p>계정 삭제 후에는 주문 정보 및 케이스티파이 클럽 포인트를 복원할 수 없습니다</p>
                <button>내 계정 삭제</button>
            </div>
        </div >
    )
}
