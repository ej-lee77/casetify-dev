import React from 'react'

export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="section-title-box">
            <h2 className="section-title">{title}</h2>
            <p className="section-sub-title">{subtitle}</p>
        </div>
    )
}
