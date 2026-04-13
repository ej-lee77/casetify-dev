import React, { useState } from 'react'
import { useProductStore } from '../store/useProductStore';
import { Link } from 'react-router-dom';

export default function HeaderMenu() {
    const { mainMenuList } = useProductStore();
    const [isMenuActive, setIsMenuActive] = useState(false); 

  return (
    <>
        {mainMenuList.map(menu => (
            <li key={menu.link} onMouseEnter={() => setIsMenuActive(true)} onMouseLeave={() => setIsMenuActive(false)}>
            {menu.sub?.length > 0 ? (
                <>
                <Link>{menu.name}</Link>
                <ul className={`sub-menu ${isMenuActive ? 'active' : ''}`}>
                    {menu.sub.map((s) => (
                    <li key={s.link}>
                        <Link to={`/${menu.link}/${s.link}`}>
                        <div>
                            <span><img src={`../images/header-footer/menu/${menu.link}-${s.link}.png`} alt={s.name} /></span>
                            <span>{s.name}</span>
                        </div>
                        </Link>
                    </li>
                    ))}
                </ul>
                </>
            ) : (
                <Link to={`/${menu.link}`}>{menu.name}</Link>
            )}
            </li>
        ))}
    </>
  )
}
