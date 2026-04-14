import { Routes, Route } from 'react-router-dom'
import './App.css'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import { useEffect } from 'react'
import { useProductStore } from './store/useProductStore'
import CategoryPage from './pages/CategoryPage'
import Login from './pages/Login'

function App() {
  const {onFetchItems} = useProductStore();

  useEffect(()=>{
    onFetchItems();
  }, []);
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Main />}/>

      <Route path='/:mainCate/:subCate' element={<CategoryPage />}/>

      <Route path='/login' element={<Login />}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App
