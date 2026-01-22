import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const {showLogin} = useContext(AppContext);

  return (
    <div className='sm:px-10 md:px-14 px-4 lg:px-28 min-h-screen bg-gradient-to-b from-cyan-10 to-blue-100'>
      <ToastContainer position = 'bottom-right' />
      <NavBar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>  
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App