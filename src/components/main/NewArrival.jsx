import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle'
import "../scss/NewArrival.scss"
import { Link } from 'react-router-dom';

// new arrival 데이터
const newArrivalData = [
    { id: 1, icon: "./images/main/newArrival/charm-blue.png", bigImg: "./images/main/newArrival/nw-photo-01.jpg", text: "DENIM MANIFESTO", itemColor: "denim", color: "#11419c" },
    { id: 2, icon: "./images/main/newArrival/charm-yellow.png", bigImg: "./images/main/newArrival/nw-photo-02.jpg", text: "HI! FOREST", itemColor: "yellow", color: "#d2b452" },
    { id: 3, icon: "./images/main/newArrival/charm-red.png", bigImg: "./images/main/newArrival/nw-photo-03.jpg", text: "PILLOW CASE", itemColor: "red", color: "#7F1D20" },
    { id: 4, icon: "./images/main/newArrival/charm-pink.png", bigImg: "./images/main/newArrival/nw-photo-04.jpg", text: "SPRING IN BLOOM", itemColor: "pink", color: "#EACAD6" },
]

export default function NewArrival() {
    // 현재 선택한 아이템
    const [activeTab, setActiveTab] = useState(newArrivalData[0].id);

    // fade 상태 파악
    const [fade, setFade] = useState(true);

    //현재 선택한 데이터
    const [activeItem, setActiveItem] = useState(newArrivalData.find(item => item.id === activeTab));

    // 이벤트 함수
    const handleChange = (id) => {
        if (id === activeTab) return;
        setFade(false);
        setActiveTab(id);
        setTimeout(() => {
            setFade(true);
            setActiveItem(newArrivalData.find(item => item.id === id));
        }, 600);
    };

    return (
        <section className="new-arrival">
            <SectionTitle title={"New Arrival"} subtitle={"케이스티파이의 새로운 제품"} />
            <div className="inner">
                <div className="new-arr-inner-wrap">
                    <ul className="new-arr-list">
                        {newArrivalData.map((arridata) => (
                            <li
                                key={arridata.id}
                                className={`arr-item ${activeTab === arridata.id ? "active" : ""}`}
                                onClick={() => handleChange(arridata.id)}
                                onMouseEnter={() => handleChange(arridata.id)}>
                                <Link to={"/"}>
                                    <img src={arridata.icon} alt={`icon_${arridata.itemColor}`} />
                                    <p className={`${arridata.itemColor}`}>{arridata.text}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={`new-arr-img-box ${fade ? "fade-in" : "fade-out"}`}>
                        <Link to={"/"}>
                            <img src={activeItem.bigImg} alt={`big_img_${activeItem.text}`} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
