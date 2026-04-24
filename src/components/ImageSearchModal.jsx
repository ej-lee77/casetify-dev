import React from 'react'
import "./scss/ImageSearchModal.scss"

export default function ImageSearchModal({ modalCheck, setModalCheck }) {
    return (
        <div className={`img-search-modal-overlay ${modalCheck ? "active" : ""}`}>
            {/* 이미지 검색 모달 검정 배경 */}
            <div className="img-search-modal-wrap">
                {/* 이미지 검색 모달 창 */}
                <div className="img-upload-content">
                    <div className="img-search-modal-header">
                        <div className="modal-title">
                            <img src="./images/icon/icon-img-search-title.svg" alt="이미지 검색 제목 아이콘" />
                            <span>이미지 검색</span>
                        </div>
                        <div className="close-btn" onClick={() => setModalCheck(false)}>
                            <img src="./images/icon/close.svg" alt="검색 닫기" />
                        </div>
                    </div>
                    <div className="img-search-modal-content">
                        <div className="dropbox-wrap">
                            <div className="upload-btn-text-wrap">
                                <p>이미지를 여기로 드래그하거나 파일 업로드</p>
                                <div className="plus-btn">
                                    <img src="./images/icon/btn_plus.svg" alt="파일 추가" />
                                </div>
                            </div>
                            {/* file upload input */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
