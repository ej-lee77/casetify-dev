import React, { useState, useMemo } from "react";
import "./scss/review.scss";

export default function Reivew() {
    const [reviews, setReviews] = useState([
        {
            user: "kana takamatsu",
            rating: 4,
            content: "케이스 품질이 생각보다 좋아요",
            date: "2026.03.04",
        },
    ]);

    const [input, setInput] = useState("");
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest"); // 최신 / 베스트

    // ⭐ 평균 점수
    const total = reviews.length;

    const avg =
        total === 0
            ? 0
            : reviews.reduce((sum, r) => sum + r.rating, 0) / total;

    const rounded = Math.round(avg * 2) / 2;

    // ⭐ 분포
    const distribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        return {
            star,
            count,
            percent: total ? (count / total) * 100 : 0,
        };
    });

    // ⭐ 검색
    const filtered = useMemo(() => {
        return reviews.filter((r) =>
            r.content.toLowerCase().includes(search.toLowerCase())
        );
    }, [reviews, search]);

    // ⭐ 정렬
    const sortedReviews = [...filtered].sort((a, b) => {
        if (sort === "latest") {
            return new Date(b.date) - new Date(a.date);
        }
        if (sort === "best") {
            return b.rating - a.rating;
        }
        return 0;
    });

    // 리뷰 추가
    const handleAddReview = () => {
        if (!input.trim()) return;

        const newReview = {
            user: "고객명",
            rating,
            content: input,
            date: new Date().toISOString().slice(0, 10),
        };

        setReviews([newReview, ...reviews]);
        setInput("");
        setRating(5);
    };

    return (
        <div className="review">
            <h3>고객리뷰</h3>

            <div className="review-star">
                {/* LEFT */}
                <div className="left">
                    <div className="score">
                        <p className="num">{rounded.toFixed(1)}</p>

                        <div className="stars">
                            {"★".repeat(Math.floor(rounded))}
                            {rounded % 1 !== 0 && "☆"}
                            {"☆".repeat(5 - Math.ceil(rounded))}
                        </div>
                    </div>

                    <div className="score-list-wrap">
                        <p>별점별 분포도</p>

                        <ul className="score-list">
                            {distribution.map((d) => (
                                <li key={d.star}>
                                    <p>{d.star}별점</p>

                                    <div className="gauge-bar">
                                        <span style={{ width: `${d.percent}%` }} />
                                    </div>

                                    <p>({d.count})</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="right">
                    <p>이 상품을 평가해 주세요</p>

                    <div className="star-select">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <span
                                key={n}
                                onClick={() => setRating(n)}
                                onMouseEnter={() => setHover(n)}
                                onMouseLeave={() => setHover(0)}
                                className={n <= (hover || rating) ? "active" : ""}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <div className="text-box">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="리뷰를 입력해주세요."
                        />
                        <button onClick={handleAddReview}>리뷰 등록</button>
                    </div>
                </div>
            </div>

            {/* 리스트 */}
            <div className="star-list">
                <div className="star-bar">
                    <div
                        className={`btn ${sort === "best" ? "active" : ""}`}
                        onClick={() => setSort("best")}
                    >
                        베스트순
                    </div>

                    <div
                        className={`btn ${sort === "latest" ? "active" : ""}`}
                        onClick={() => setSort("latest")}
                    >
                        최신순
                    </div>

                    <input
                        type="text"
                        placeholder="리뷰 검색"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <ul className="star detail">
                    {sortedReviews.map((r, i) => (
                        <li key={i}>
                            <div className="user info">
                                <p className="user">{r.user}</p>

                                <div className="star-core">
                                    {"★".repeat(r.rating)}
                                    {"☆".repeat(5 - r.rating)}
                                </div>

                                <p className="date">{r.date}</p>
                            </div>

                            <div className="user-review">{r.content}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}