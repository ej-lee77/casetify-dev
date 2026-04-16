import React from 'react'

export default function Reivew() {
    return (
        <div className="rivew">
            <h3>고객리뷰</h3>
            <div className="rivew-star">
                <div className="left">
                    <div className="score">
                        <p>점수</p>
                        <i></i>
                    </div>
                    <div className="score-list-wrap">
                        <p>별 점별 분포도</p>
                        <ul className="socre-list">
                            <li>
                                <p>5별점</p>
                                <div class="gaze-bar"></div>
                                <p>(누적)</p>
                            </li>
                            <li>
                                <p>4별점</p>
                                <div class="gaze-bar"></div>
                                <p>(누적)</p>
                            </li>
                            <li>
                                <p>3별점</p>
                                <div class="gaze-bar"></div>
                                <p>(누적)</p>
                            </li>
                            <li>
                                <p>2별점</p>
                                <div class="gaze-bar"></div>
                                <p>(누적)</p>
                            </li>
                            <li>
                                <p>1별점</p>
                                <div class="gaze-bar"></div>
                                <p>(누적)</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <p>이 상품을 평가해주세요</p>
                    <i></i>
                    <div className="text-box">
                        {/* <input type="text"> */}
                        <button>리뷰등록</button>
                    </div>
                </div>



            </div>
            <div class="star-list">
                <div class="star-bar">
                    <div class="best">베스트순</div>
                    <div class="new">최신순</div>
                    <div class="search-box">
                        {/* <input type="text" placeholder="궁금한 내용의 단어나 키워드로 검색하세요"> */}
                        <span class="icon">🔍</span>
                    </div>
                </div>
                <ul class="star detail">
                    <li>
                        <div class="user info">
                            <p class="user"></p>
                            <i class="star-core"></i>
                            <p class="date"></p>
                        </div>
                        <div class="user-rivew"></div>


                    </li>



                </ul>




            </div>


        </div>
    )
}
