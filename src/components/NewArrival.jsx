import React, { useState } from 'react'
import SectionTitle from './SectionTitle'
import "./scss/NewArrival.scss"

// new arrival 데이터
const newArrivalData = [
    { id: 1, icon: "./images/main/section/newArrival/charm-blue.png", bigImg: "./images/main/section/newArrival/nw-photo-01.jpg", text: "DENIM MANIFESTO", itemColor: "denim", color: "#11419c" },
    { id: 2, icon: "./images/main/section/newArrival/charm-yellow.png", bigImg: "./images/main/section/newArrival/nw-photo-02.jpg", text: "HI! FOREST", itemColor: "yellow", color: "#d2b452" },
    { id: 3, icon: "./images/main/section/newArrival/charm-red.png", bigImg: "./images/main/section/newArrival/nw-photo-03.jpg", text: "PILLOW CASE", itemColor: "red", color: "#7F1D20" },
    { id: 4, icon: "./images/main/section/newArrival/charm-pink.png", bigImg: "./images/main/section/newArrival/nw-photo-04.jpg", text: "SPRING IN BLOOM", itemColor: "pink", color: "#EACAD6" },
]

export default function NewArrival() {
    // item 정보 파악 변수
    const { activeTab, setActiveTab } = useState(1);

    return (
        <section className="new-arrival">
            <SectionTitle title={"New Arrival"} subtitle={"케이스티파이의 새로운 제품"} />
            <div className="inner">
                <div className="new-arr-inner-wrap">
                    <ul className="new-arr-list">
                        {/* <li className="arr-item">
                            <img src="./images/main/section/newArrival/charm-blue.png" alt="img" />
                            <p>DENIM MANIFESTO</p>
                        </li>
                        <li className="arr-item">
                            <img src="./images/main/section/newArrival/charm-yellow.png" alt="img" />
                            <p>HI! FOREST</p></li>
                        <li className="arr-item active">
                            <img src="./images/main/section/newArrival/charm-red.png" alt="img" />
                            <p>PILLOW CASE</p></li>
                        <li className="arr-item">
                            <img src="./images/main/section/newArrival/charm-pink.png" alt="img" />
                            <p>SPRING IN BLOOM</p></li> */}
                        {newArrivalData.map((arridata, id) => (
                            <li key={id} className="arr-item">
                                <img src={arridata.icon} alt={`icon_${arridata.itemColor}`} />
                                <p>{arridata.text}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="new-arr-img-box">
                        <img src="./images/main/section/newArrival/nw-photo-01.jpg" alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}
