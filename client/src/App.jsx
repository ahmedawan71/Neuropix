import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

const App = () => {

  const {showLogin} = useContext(AppContext);

  return (
    <div className='sm:px-10 md:px-14 px-4 lg:px-28 min-h-screen bg-gradient-to-b from-cyan-10 to-blue-100'>
      <NavBar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>  
      </Routes>
      <Footer/>
    </div>
  )
}

export default App