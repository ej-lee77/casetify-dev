import React, { useEffect, useState } from 'react'
import "./scss/WishList.scss"
import MypageTitle from './MypageTitle'
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function WishList() {
    const [wishItemList, setWishItemList] = useState([]);
    const { user, wishlist, onFetchWishlist, onRemoveWishlist } = useAuthStore();
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(()=>{ 
        if (!user) return;
        onFetchWishlist();
    }, [user]);

    return (
        <div className='wishlist-wrap'>
            <MypageTitle title={"위시리스트"} />
            <ul className="wish-list">
                {wishlist.map((item) => (
                    <li key={`${item.productId}-${item.deviceKey}-${item.color}`} className="wish-product-card">
                        <Link to={`/detail/${item.productId}`}>
                            <div className="card-img">
                                <img src={`${item.imgUrl}`} alt={item.title}/>
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
                        <button onClick={() => setItemToDelete(item)} className='wish-heart'><img src="/images/icon/icon_favorite_fill.svg" alt="위시리스트 해제" /></button>
                    </li>
                ))}
            </ul>
            {itemToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>위시리스트에서 지워도 될까요?</p>
                        <div className="modal-buttons">
                            <button className="confirm-btn"
                            onClick={() => {
                                onRemoveWishlist(itemToDelete); // 진짜 삭제 실행
                                setItemToDelete(null); // 팝업 닫기
                            }}>확인</button>
                            <button className="cancel-btn" onClick={() => setItemToDelete(null)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
