import React from "react";
import { Link } from "react-router-dom";

export default function CategoryMenuMap({
    mainCate,
    mainCateKo,
    subCateKo,
    mainSubList = [],
}) {
    const firstSub = mainSubList[0];

    const mainTargetPath = firstSub
        ? `/${mainCate}/${firstSub.link}`
        : `/${mainCate}`;

    return (
        <div className="menu-map">
            <Link to="/">홈</Link>
            <span> &gt; </span>

            <Link to={mainTargetPath}>{mainCateKo}</Link>
            <span> &gt; </span>

            <span className="current">{subCateKo}</span>
        </div>
    );
}