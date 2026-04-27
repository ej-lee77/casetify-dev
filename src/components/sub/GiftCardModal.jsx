import React, { useState } from 'react'
import "./scss/GiftCardModal.scss"
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function GiftCardModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [cardCode, setCardCode] = useState("");
    const [msg, setMsg] = useState("");
    const {registerGiftCard} = useAuthStore();

    if (!isOpen) return null;

    const handleSubmit = async() => {
        if (cardCode) {
            const isGift = await registerGiftCard(cardCode);
            console.log(isGift);
            if(isGift === true){
                onClose(); // 등록 후 팝업 닫기
            }else if(isGift === "코드"){
                setMsg("유효하지 않은 코드입니다.");
            }else{
                setMsg("등록실패");
            }
        } else {
            alert("모든 정보를 입력해주세요.");
        }
    };
    return (
        <div className="modal-overlay">
            <div className="gift-card-popup">
                <div className="popup-header">
                    <span className="card-icon"><img src="/images/mypage/gift/gift-card.svg" alt="기프트카드" /></span>
                    <h2>기프트 카드 계정에 추가하기</h2>
                </div>
                
                <p className="popup-description">
                    기프트 카드 코드를 입력하면 케이스티파이 클럽 계정에 추가됩니다. 기프트 카드는 다른 계정으로 양도하거나 다른 기프트 카드를 구매하는 데 사용할 수 없으며, 법이 요청하는 경우를 제외하고 현금으로 교환할 수 없습니다. 기프트 카드 잔액과 사용 기한은 기프트 카드 크레딧에서 확인할 수 있습니다.
                    <Link>이용약관</Link>
                </p>

                <div className="input-container">
                    <input 
                        type="text" 
                        placeholder="일련번호 (10 숫자)" 
                        value={cardCode}
                        onChange={(e) => setCardCode(e.target.value)}
                    />
                </div>

                <div className="popup-buttons">
                    <p>{msg}</p>
                    <button className="confirm-btn" onClick={handleSubmit}>확인</button>
                    <button className="cancel-btn" onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    )
}
