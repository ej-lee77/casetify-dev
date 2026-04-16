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
import ProductDetailPage from './components/sub/product detail page/ProductDetailPage'

function App() {
  const { onFetchItems } = useProductStore();
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로가 변경될 때마다 최상단으로 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    onFetchItems();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />

        {/* <Route path='/:mainCate/:subCate' element={<CategoryPage />}/> */}
        <Route path='/:mainCate/:subCate' element={<CategoryPagePractice />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
