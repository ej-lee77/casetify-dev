import { Routes, Route } from 'react-router-dom'
import './App.css'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Main />}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App
