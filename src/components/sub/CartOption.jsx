import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';

export default function CartOption({item, colorMap, phoneModelOptions, onClose}) {
    const [selectedColor, setSelectedColor] = useState(item.color);
    const [selectedModel, setSelectedModel] = useState(item.device);
    const [modelAccordionOpen, setModelAccordionOpen] = useState(false);
    const [selectedBrandTab, setSelectedBrandTab] = useState(item.deviceBrand);
    const { onUpdateOption } = useAuthStore();

    const handleOptionChange = ()=>{
        const selectedModelData = phoneModelOptions[selectedBrandTab]?.find(m => m.label === selectedModel);
    
        // 스토어의 메서드 호출
        onUpdateOption(
            item,           // 기존 아이템 정보
            selectedModel,  // 새로 선택한 기종 이름
            selectedColor,  // 새로 선택한 컬러
            selectedModelData?.key || item.deviceKey // 새로 선택한 기종 키
        );

        onClose();
    }
  return (
    <div className="option-modal">
        <div className="option-box">
            <div className='option-box-title'>
                <h3>옵션</h3>
                <span onClick={onClose}><img src="/images/icon/close.svg" alt="닫기" /></span>
            </div>
            <div className="model-select-box">
                {item.isPhone && (
                    <div className="detail-info-box">
                        <p className="label">기종</p>
                        <div className="model-accordion">
                            <button
                                type="button"
                                className="model-accordion-trigger"
                                onClick={() => setModelAccordionOpen((prev) => !prev)}
                            >
                                <span>{selectedModel || "기종을 선택하세요"}</span>
                                <span className={`model-accordion-arrow ${modelAccordionOpen ? "open" : ""}`}>▼</span>
                            </button>
                            {modelAccordionOpen && (
                                <div className="model-accordion-list">
                                    <div className="model-brand-tabs">
                                        {Object.keys(phoneModelOptions).map((brand) => (
                                            <button
                                                key={brand}
                                                type="button"
                                                className={selectedBrandTab === brand ? "active" : ""}
                                                onClick={() => setSelectedBrandTab(brand)}
                                            >
                                                {brand}
                                            </button>
                                        ))}
                                    </div>
                                    <ul className="model-sub-list">
                                        {(phoneModelOptions[selectedBrandTab] || []).map((model) => (
                                            <li
                                                key={model.key}
                                                className={selectedModel === model.label ? "active" : ""}
                                                onClick={() => {
                                                    setSelectedModel(model.label);
                                                    setModelAccordionOpen(false);
                                                }}
                                            >
                                                {model.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {!!item.colorList?.length && (
            <div className="detail-info-box">
                <p className="label">케이스 컬러</p>
                <div className="detail-colors">
                    {item.colorList.map((color) => (
                        <button
                        key={color}
                        type="button"
                        className={selectedColor === color ? "active" : ""}
                        onClick={() => {
                            setSelectedColor(color);
                        }}
                        >
                        <span
                            className="color-chip"
                            style={{ backgroundColor: colorMap[color] || "#ddd" }}
                        />
                        {color}
                        </button>
                    ))}
                </div>
            </div>
            )}
            <button type='button' className='input-btn' onClick={() => handleOptionChange()}>옵션 변경</button>
        </div>
    </div>
  )
}
