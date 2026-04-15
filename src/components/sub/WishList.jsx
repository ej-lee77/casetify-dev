import React from 'react'
import "./scss/WishList.scss"
import MypageTitle from './MypageTitle'


export default function WishList() {
    return (
        <div>
            <MypageTitle title={"위시리스트"} />
            <ul className="wish-list">
                {/* component item */}
                <li>
                    <div className="img-box">
                        <img src="./images/main/bestproduct/BpProduct001.png" alt="test-img" />
                        <span className="fav-icon"><img src="./images/icon/icon_favorite_fill.svg" alt="" /> </span>
                    </div>
                    <div className="text-box">
                        <p className="item-name">Happiest KKOTKA in the world</p>
                        <p className="item-price">₩{Number("29000").toLocaleString()}</p>
                    </div>
                </li>
                {/* 하단 카드아이템 배열 map 적용 후 삭제 */}
                <li>
                    <div className="img-box">
                        <img src="./images/main/bestproduct/BpProduct001.png" alt="test-img" />
                        <span className="fav-icon"><img src="./images/icon/icon_favorite_fill.svg" alt="" /> </span>
                    </div>
                    <div className="text-box">
                        <p className="item-name">Happiest KKOTKA in the world</p>
                        <p className="item-price">₩{Number("29000").toLocaleString()}</p>
                    </div>
                </li>
                <li>
                    <div className="img-box">
                        <img src="./images/main/bestproduct/BpProduct001.png" alt="test-img" />
                        <span className="fav-icon"><img src="./images/icon/icon_favorite_fill.svg" alt="" /> </span>
                    </div>
                    <div className="text-box">
                        <p className="item-name">Happiest KKOTKA in the world</p>
                        <p className="item-price">₩{Number("29000").toLocaleString()}</p>
                    </div>
                </li>
                <li>
                    <div className="img-box">
                        <img src="./images/main/bestproduct/BpProduct001.png" alt="test-img" />
                        <span className="fav-icon"><img src="./images/icon/icon_favorite_fill.svg" alt="" /> </span>
                    </div>
                    <div className="text-box">
                        <p className="item-name">Happiest KKOTKA in the world</p>
                        <p className="item-price">₩{Number("29000").toLocaleString()}</p>
                    </div>
                </li>
                <li>
                    <div className="img-box">
                        <img src="./images/main/bestproduct/BpProduct001.png" alt="test-img" />
                        <span className="fav-icon"><img src="./images/icon/icon_favorite_fill.svg" alt="" /> </span>
                    </div>
                    <div className="text-box">
                        <p className="item-name">Happiest KKOTKA in the world</p>
                        <p className="item-price">₩{Number("29000").toLocaleString()}</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}
