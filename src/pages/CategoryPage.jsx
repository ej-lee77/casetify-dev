import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import "./scss/CategoryPage.scss"

export default function CategoryPage() {
    const {mainCate, subCate} = useParams();
    const {items, onFetchItems, mainMenuList, filterItems, onFilterMainCate, onLastCategoryMenu} = useProductStore();

    // 한글로 변환
    const mainCateKo = mainMenuList.find((main)=>main.link===mainCate).name;
    const subCateKo = mainMenuList.find((main)=>main.link===mainCate).sub?.find((sub)=>sub.link===subCate).name;
    const miniCate = mainMenuList.find((main)=>main.link===mainCate).sub?.find((sub)=>sub.link===subCate).mini;

    useEffect(()=>{
        if(items.length === 0){
            onFetchItems();
        }
    }, [items]);

    useEffect(()=>{
        if(items.length > 0){
            onFilterMainCate(mainCateKo, subCateKo);
            // onLastCategoryMenu();
        }
    }, [items, mainCate, subCate]);

    const onhandleMiniCategory = (mini)=>{
        // console.log("minicateClick");
        onFilterMainCate(mainCateKo, subCateKo, mini);
    }

    console.log("최종 카테",filterItems);

  return (
    <div className="sub-page-wrap">
        <h2>{subCateKo}</h2>
        {miniCate ?         
            <ul className="mini-menu">
                {miniCate.map((mini, id)=>
                    <li key={id} onClick={()=>onhandleMiniCategory(mini)}>
                        {mini}
                    </li>
                )}
            </ul>
            : null
        }
        <ul className='product-list'>
            {filterItems.map((item)=>(
                <li key={item.id}>
                    {item.productName}
                </li>
            ))}
        </ul>
    </div>
  )
}
