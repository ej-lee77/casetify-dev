import React from 'react'
import "../scss/Quality.scss"
import SectionTitle from '../SectionTitle'
import { Link } from 'react-router-dom'

// 케이스티파이 Quality 특징관련 데이터
const infoCardData = [
    { img: "./images/main/quality/bump.jpg", text: "100번의 낙하 테스트\n한계를 넘는 보호력" },
    { img: "./images/main/quality/glaze.jpg", text: "벗겨지지 않는\n컬러의 완성\n글레이즈 기술" },
    { img: "./images/main/section/quality/stand.jpg", text: "카메라 프로텍터\n스탠드가 되다" },
    { img: "./images/main/section/quality/stain.jpg", text: "변색 없이\n오래 유지되는\n투명함" },
]

// 하단 benefit 배너 데이터
const subCardData = [
    { img: "./images/main/quality/benefit01.jpg", topText: "당신을 위한 특별 회원 혜택", bottomText: "지금 바로 CASETiFY 클럽 로열티 프로그램에 가입해 \n특별 혜택을 즐겨보세요." },
    { img: "./images/main/quality/benefit02.jpg", topText: "Re/CASETiFY 프로세스", bottomText: "210만개 이상의 케이스를 재활용했습니다." },
    { img: "./images/main/quality/benefit03.jpg", topText: "100% 만족 보장", bottomText: "구매하시는 모든 CASETiFY 제품에 대해 다음과 같은\n 품질 보증 및 만족 보장 계획을 도입하고있습니다." },
]

export default function Quality() {
    return (
        <section className="quality-info">
            <SectionTitle title={"Protection Quality"} subtitle={"케이스티파이만의 완벽한 기준"} />
            {/* Quality 특징 */}
            <ul className="quality-card-wrap">
                {infoCardData.map((item, i) => (
                    <li key={i} className="quality-card">
                        <img src={item.img} alt={`quality-img${i + 1}`} />
                        <div className="text-box">{item.text}</div>
                    </li>
                ))}
            </ul>
            {/* Benefit */}
            <div className="inner">
                <ul className="benefit-card-list">
                    {subCardData.map((data, d) => (
                        <li key={d} className="benefit-banner-item">
                            <Link>
                                <img src={data.img} alt={`banefit-img${d + 1}`} />
                                <div className="text-box">
                                    <p className="text1">{data.topText}</p>
                                    <p className="text2">{data.bottomText}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
