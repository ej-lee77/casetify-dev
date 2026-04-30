import React, { useState } from 'react'
import "./scss/ImageSearchModal.scss"
import { useProductStore } from '../store/useProductStore';
import { useNavigate } from 'react-router-dom';

export default function ImageSearchModal({ modalCheck, setModalCheck }) {
    const [isDragging, setIsDragging] = useState(false);
    const { onSetSearchWord } = useProductStore();
    const navigate = useNavigate();
    
    const handleFile = (file) => {
        if (file && file.type.startsWith("image/")) {
            onSetSearchWord("폰");
            // 검색어 페이지로 이동
            navigate('/search');
            setModalCheck(false);
        } else {
            alert("이미지 파일만 업로드 가능합니다.");
        }
    };

    const handleFileChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };
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
                        <div className={`dropbox-wrap ${isDragging ? "dragging" : ""}`}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}>
                            <label htmlFor="file-upload">
                                <div className="upload-btn-text-wrap">
                                    
                                    <p>이미지를 여기로 드래그하거나 파일 업로드</p>
                                    <div className="plus-btn">
                                        <img src="./images/icon/btn_plus.svg" alt="파일 추가" />
                                    </div>
                                </div>
                            </label>
                            {/* file upload input */}
                            <input 
                                type="file" 
                                id="file-upload" 
                                style={{ display: 'none' }} 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {previewSrc && (
                <img 
                    src={previewSrc} 
                    ref={hiddenImgRef} 
                    alt="hidden-preview" 
                    style={{ display: 'none' }} 
                    onLoad={(e) => runPrediction(e.target)} 
                />
            )}
        </div>
    )
}
