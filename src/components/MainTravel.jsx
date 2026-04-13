import { useEffect, useRef } from "react";
import "./scss/maintravel.scss";

export default function MainTravel() {

    const videoRef = useRef(null);

    useEffect(() => {

        const handleScroll = () => {
            const rect = videoRef.current.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (
        <section className="travel">
            <div className="travel-video">

                <video
                    ref={videoRef}
                    className="travel-player"
                    src="./video/main-travel.mp4"
                    muted
                    loop
                    playsInline
                    poster="./images/main/travel.png"
                    controls
                />

                <div className="travel-text">
                    <h2>Travel</h2>
                    <p>발걸음마다 예술이 되는 나만의 움직이는 캔버스</p>
                </div>

            </div>
        </section>
    );
}