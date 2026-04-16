import React from 'react'
import "./scss/SectionTitle.scss"
import FadeInSection from './FadeInSection'

export default function SectionTitle({ title, subtitle, subLink }) {
    return (
        <FadeInSection direction="up" delay={0.2}> 
            <div className="section-title-box">
                <h2 className="section-title">{title}</h2>

                {subtitle && (
                    <p className="section-sub-title">
                        {subLink ? (
                            <a
                                href={subLink}
                                className="section-sub-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {subtitle}
                            </a>
                        ) : (
                            subtitle
                        )}
                    </p>
                )}
            </div>
        </FadeInSection>
    )
}