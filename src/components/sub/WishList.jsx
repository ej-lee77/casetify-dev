import React, { useEffect, useState } from 'react'
import "./scss/WishList.scss"
import MypageTitle from './MypageTitle'
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';


// 임시 배열
const tempItem = [
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", productName: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Deep-Blue_Black"},
];

export default function WishList() {
    const [wishItemList, setWishItemList] = useState([]);
    const { user, wishlist, onFetchWishlist, onRemoveWishlist } = useAuthStore();

    useEffect(()=>{ 
        if (!user) return;
        onFetchWishlist();
        setWishItemList(wishlist);
        // setWishItemList(tempItem);
    }, [user, wishlist]);

    return (
        <div>
            <MypageTitle title={"위시리스트"} />
            <ul className="wish-list">
                {wishItemList.map((item) => (
                    <li key={item.productId} className="wish-product-card">
                        <Link to={`/detail/${item.productId}`}>
                            <div className="card-img">
                                <img src={`/images/category/products/${item.productId}_${item.device}_${item.color}_main.jpg`} alt={item.title}/>
                            </div>
                            <div className="card-info">
                            <p className="card-name">{item.title}</p>
                            <p className="card-price">{Number(item.price || 0).toLocaleString()}원</p>
                            <div className="card-option">
                                <p>[옵션]</p>
                                <p><span>{item.device}</span><span>{item.color}</span></p>
                            </div>
                            </div>
                        </Link>
                        <button onClick={()=>onRemoveWishlist(item)} className='wish-heart'><img src="/images/icon/icon_favorite_fill.svg" alt="위시리스트 해제" /></button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
