import React from 'react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

export default function Header() {
  const {mainMenuList} = useProductStore();

  return (
    <header>
        <div className="inner">
            <div className="header-left">
                <h1><Link to="/"><img src="./images/casetify-logo-15th.png" alt="casetify" /></Link></h1>
                <ul className="main-menu">
                    {mainMenuList.map(menu=>(
                        <li key={menu.link}>
                            {menu.sub?.length>0 ? (
                                <>
                                    <Link>{menu.name}</Link>
                                    <ul className='sub'>
                                        {menu.sub.map((s)=>(
                                            <li key={s.link}>
                                                <Link to={`/${menu.link}/${s.link}`}>{s.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ):(
                                <Link to={`/${menu.link}`}>{menu.name}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="header-right"></div>
        </div>
    </header>
  )
}
