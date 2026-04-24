import React, { useEffect, useState } from 'react'
import "./scss/WishList.scss"
import MypageTitle from './MypageTitle'
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function WishList() {
    const [wishItemList, setWishItemList] = useState([]);
    const { user, wishlist, onFetchWishlist, onRemoveWishlist } = useAuthStore();

    useEffect(()=>{ 
        if (!user) return;
        onFetchWishlist();
    }, [user]);

    return (
        <div>
            <MypageTitle title={"위시리스트"} />
            <ul className="wish-list">
                {wishlist.map((item) => (
                    <li key={`${item.productId}-${item.deviceKey}-${item.color}`} className="wish-product-card">
                        <Link to={`/detail/${item.productId}`}>
                            <div className="card-img">
                                <img src={`/images/category/products/${item.productId}_${item.imgUrl}_main.jpg`} alt={item.title}/>
                            </div>
                            <div className="card-info">
                            <p className="card-name">{item.title}</p>
                            <p className="card-price">{Number(item.price || 0).toLocaleString()}원</p>
                            <div className="card-option">
                                <p>[옵션]</p>
                                <p>{item.device && <span>{item.device}</span>}<span>{item.color}</span></p>
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
