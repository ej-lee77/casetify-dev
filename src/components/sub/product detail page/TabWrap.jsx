import React from 'react'
import Detail from './detail'
import Reivew from './Reivew'
import Qa from './Qa'
import Change from './Change'

export default function
    () {
    return (
        <div className='tab-wrap'>
            <ul>
                <li>상품 상세</li>
                <li>상품 평<span>(스코어)</span></li>
                <li>상품 문의</li>
                <li>배송/교환/반품 안내</li>
            </ul>

            <Detail />
            <Reivew />
            <Qa />
            <Change />
        </div>
    )
}
