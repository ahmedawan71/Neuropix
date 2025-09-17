import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='sm:px-10 md:px-14 px-4 lg:px-28 min-h-screen bg-gradient-to-b from-cyan-10 to-blue-100'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>  
      </Routes>
    </div>
  )
}

export default App