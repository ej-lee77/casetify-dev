import React from 'react'
import { useLocation } from "react-router-dom";
import "./scss/productwrap.scss"
import "./css/productwrap.css"

export default function Productwrap() {
    const { state } = useLocation();
    const item = state?.item;

    if (!item) return <div>데이터 없음</div>;

    return (
        <>
            {pdEx.map((P) => (
                <div className="product-wrap" key={P.id}>

                    {/* LEFT */}
                    <div className="left">

                        <div className="img-color-bar">
                            <div className="now-color">
                                {P.colors?.[0]?.name}
                            </div>

                            <div className="another-color">
                                <ul>
                                    {P.colors?.map((c) => (
                                        <li key={c.id}>{c.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="product-img">
                            <div className="product-main-img">
                                <img src="" alt="" />
                            </div>

                            <div className="product-sub-img">
                                <ul>
                                    {P.subImages?.map((img, i) => (
                                        <li key={i}>
                                            <img src={img} alt="" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="right">

                        <div className="badge">
                            <div className="free-delivery">무료배송</div>
                            <div className="raer">한정</div>
                        </div>

                        <p className="product-title">{P.name}</p>
                        <p className="product-price">
                            {P.price.toLocaleString()}원
                        </p>

                        <div className="product-number">{P.modelCode}</div>

                        {/* 기종 */}
                        <div className="model">
                            <p>기종</p>
                            <ul>
                                {P.models?.map((m, i) => (
                                    <li key={i}>{m}</li>
                                ))}
                            </ul>
                        </div>

                        {/* 컬러 */}
                        <div className="product-color">
                            <p>컬러</p>
                            <ul>
                                {P.colors?.map((c) => (
                                    <li key={c.id}>{c.name}</li>
                                ))}
                            </ul>
                        </div>

                        <button>장바구니 담기</button>

                    </div>

                </div>
            ))}
        </>
    )
};