import React from 'react'

export default function MainTravel() {
    const handleEnter = (e) => {
        e.target.play();
    };

    const handleLeave = (e) => {
        e.target.pause();
        e.target.currentTime = 0;
    };

    return (
        <section className="video-section">
            <video
                muted
                playsInline
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                <source src="./videos/travel.mp4" type="video/mp4" />
            </video>
        </section>);
}
