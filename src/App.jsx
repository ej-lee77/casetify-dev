import { Routes, Route } from 'react-router-dom'
import './App.css'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import { useEffect } from 'react'
import { useProductStore } from './store/useProductStore'
import CategoryPage from './pages/CategoryPage'
import Mypage from './pages/Mypage'

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

        <Route path='/:mainCate/:subCate' element={<CategoryPage />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
