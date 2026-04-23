import React from 'react'
import { useParams } from "react-router-dom";
import { items } from "../../../data/finalData";


import TabWrap from './TabWrap'
import DetailPage from './DetailPage'
import BundleRecommend from './budleReocomend';




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
  
             <BundleRecommend item={item}/>
                    <br />
          <TabWrap item={item} />

            </div>





        </>
    )
}
