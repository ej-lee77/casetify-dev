import React from 'react'

import KYMain from './KYMain'


export default function Bp() {
    const slides = [
        { src: "../../public/images/KY/B/BP/Bp01.png", alt: "slider1" },
        { src: "../../public/images/KY/B/BP/Bp02.png", alt: "slider2" },
        { src: "../../public/images/KY/B/BP/Bp03.png", alt: "slider3" },
        { src: "../../public/images/KY/B/BP/Bp04.png", alt: "slider4" }
    ]

    const { slides } = KYMain();

    return (
        <div className="inner">
            <section className="bpsection">
                <KYMainSwiper slides={slides} />
            </section>
        </div>)
}
