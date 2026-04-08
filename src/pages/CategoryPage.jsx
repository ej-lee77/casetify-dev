import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

export default function CategoryPage() {
    const {mainCate, subCate} = useParams();
    const {items, onFetchItems, mainMenuList} = useProductStore();

    // 한글로 변환
    const mainCateKo = mainMenuList.find((main)=>main.link===mainCate).name;
    const subCateKo = mainMenuList.find((main)=>main.link===mainCate).sub?.find((sub)=>sub.link===subCate).name;

    useEffect(()=>{
        if(items.length === 0){
            onFetchItems();
        }
    }, [items]);

    console.log("이건 다",items);
    
    // 카테고리별 필터링
    let cateItems = items.filter((item)=>{
        // 메인 메뉴 카테고리 필터
        if(mainCate && item.mainCategory !== mainCateKo){
            return false;
        }
        // subcategory가 있을 경우 필터
        // if(category2 && item.category2 !== category2){
        //     return false;
        // }
        return true;
    }); 

    console.log("최종 카테",cateItems);

  return (
    <div>
        <h2>{subCateKo}</h2>
        <ul className='product-list'>
            {cateItems.map((item)=>(
                <li key={item.id}>
                    {item.productName}
                </li>
            ))}
        </ul>
    </div>
  )
}
