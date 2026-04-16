import React from 'react'

const BUNDLES = [
    {
        id: 1,
        name: "케이스",
        price: 89000,
        image: "/images/case.png",
        checked: true
    },
    {
        id: 2,
        name: "스트랩",
        price: 30000,
        image: "/images/strap.png",
        checked: true
    },
    {
        id: 3,
        name: "그립톡",
        price: 30000,
        image: "/images/griptok.png",
        checked: true
    },
    {
        id: 4,
        name: "강화유리",
        price: 15000,
        image: "/images/glass.png",
        checked: false
    }
];




export default function Recomand() {
    return (
        <>
            <div className="recomand-wrap">
                <ul>
                    {BUNDLES.map((b) => (
                        <li key={b.id}>
                            <img src={b.image} alt={b.name} />

                            <p className="re-title">{b.name}</p>
                            <p className="re-price">{b.price}원</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
