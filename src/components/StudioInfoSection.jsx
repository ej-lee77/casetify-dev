import React from 'react'
import SectionTitle from './SectionTitle'
import { Link } from 'react-router-dom'

export default function StudioInfoSection() {
    return (
        <section className="studio-info">
            <SectionTitle title={"CASETiFY STUDIO"} subtitle={"전국 오프라인 매장에서 만나보세요!"} />
            <div className="inner">
                <div className="img-box"></div>
                <div className="txt-box">
                    <h3>케이스티파이와 함께 나만의 스타일을 완성하세요</h3>
                    <ul className="stdio-feature">
                        <li>나의 취향을 실물로 바로 확인하는 곳, 디자인 및 소개 피팅</li>
                        <li>기다림 없이 바로 만나는 즐거움, 커스텀 케이스 당일 수령</li>
                        <li>나만의 개성을 더해줄 포인트, 다양한 테크 악세서리 체험</li>
                    </ul>
                    <Link className="studio-search">매장찾기</Link>
                </div>
            </div>
        </section>
    )
}
