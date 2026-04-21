import React from 'react'
import { useParams } from "react-router-dom";
import { items } from "../../../data/finalData";

import Recommend from './Recommend'
import TabWrap from './TabWrap'
import DetailPage from './DetailPage'



export default function ProductDetailPage() {


    const { id } = useParams();
const item = items.find((data) => String(data.id) === String(id));

    if (!item) {
        return <div>상품 없음</div>;
    }

    return (
        <>
            <div className="inner">

            <DetailPage item={item} />
             <Recommend item={item} />
          <TabWrap item={item} />

            </div>





        </>
    )
}
