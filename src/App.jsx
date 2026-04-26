import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import { useEffect } from 'react'
import { useProductStore } from './store/useProductStore'
// import CategoryPage from './pages/CategoryPage'
import Login from './pages/Login'
import Mypage from './pages/Mypage'
import CategoryPagePractice from './pages/CategoryPagePractice'
import Join from './pages/Join'
import NaverCallBack from './pages/NaverCallBack'
import JoinMail from './pages/JoinMail'
import JoinComplete from './pages/JoinComplete'
import LoginFind from './pages/LoginFind'
import Cart from './pages/Cart'
import ProductDetailPage from './components/sub/product detail page/ProductDetailPage'
import CustomPage from './pages/CustomPage'
import { useAuthStore } from './store/useAuthStore'
import Payment from './pages/Payment'
import PayComplete from './pages/PayComplete'
import Store from './pages/Store'

function App() {
  const { pathname } = useLocation();
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 페이지 이동 직후 실행
    window.scrollTo(0, 0);

    // 팝업 렌더링 대비한
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />

        <Route path='/:mainCate/:subCate' element={<CategoryPagePractice />} />
        <Route path="/detail/:id" element={<ProductDetailPage />} />
        <Route path='/custom' element={<CustomPage />} />

        <Route path='/login' element={<Login />} />
        <Route path='/login/naver' element={<NaverCallBack />} />
        <Route path='/login/find/:content' element={<LoginFind />} />
        <Route path='/join' element={<Join />} />
        <Route path='/join/mail' element={<JoinMail />} />
        <Route path='/join/complete' element={<JoinComplete />} />

        <Route path='/mypage' element={<Mypage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />}/>
        <Route path='/payment/complete' element={<PayComplete />}/>

        <Route path='/brand/store' element={<Store/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
