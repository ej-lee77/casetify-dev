import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function AddressSearch({ setAddressData }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    // 선택한 데이터를 부모 컴포넌트로 전달
    setAddressData({
      zonecode: data.zonecode, // 우편번호
      address: fullAddress,    // 주소
    });
    
    setIsOpen(false); // 팝업 닫기
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>주소 검색</button>
      {isOpen && (
        <DaumPostcode onComplete={handleComplete} />
      )}
    </div>
  );
}