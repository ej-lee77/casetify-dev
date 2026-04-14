import { Routes, Route } from 'react-router-dom'
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

function App() {
  const { onFetchItems } = useProductStore();

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

        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
