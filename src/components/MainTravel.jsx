
import "./scss/maintravel.scss"

export default function MainTravel() {
    const handlePlay = () => {
        const video = document.getElementById("travel-player");
        video.style.display = "block";
        video.play();
    };
    return (
        <section className="travel">
            <div className="travel-video">
                <p><button className="travel-play-btn" onClick={handlePlay}>
                    ▶
                </button></p>
                <img
                    className="travel-bg"
                    src="./images/main/travel.png"
                    alt="바운스캐리어 동영상"
                />
                <video
                    id="travel-player"
                    className="travel-player"
                    muted
                    controls
                >
                    <source src="./video/main-travel.mp4" type="video/mp4" />
                </video>
                <div className="travel-text">
                    <h2>Travel</h2>
                    <p>발걸음마다 예술이 되는 나만의 움직이는 캔버스</p>
                </div>
            </div>
        </section >
    );
}
