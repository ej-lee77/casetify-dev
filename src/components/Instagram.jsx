
import SectionTitle from './SectionTitle'
import "./scss/maintravel.scss"

export default function Instagram() {
    return (
        <section className='instagram'>
            <SectionTitle title={"INSTAGRAM"} subtitle={"@casetify"} />
            <ul>
                <li>
                    <p>#ILLIT_WONHEE</p>
                    <video
                        src="./video/main-instagram1.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls
                    />
                </li>
                <li>
                    <p>#Murakami World</p>
                    <video
                        src="./video/main-instagram2.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls
                    />
                </li>
                <li>
                    <p>#RISABAE</p>
                    <video
                        src="./video/main-instagram3.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls
                    />
                </li>
                <li>
                    <p>#Dex</p>
                    <video
                        src="./video/main-instagram4.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls
                    />
                </li>
                <li>
                    <p>#Girls Sweet Date</p>
                    <video
                        src="./video/main-instagram5.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls
                    />
                </li>
            </ul>
        </section>
    )
}
