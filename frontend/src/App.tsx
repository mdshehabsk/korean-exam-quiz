
import './App.css'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Exam from './pages/Exam'
function App() {


  return (
    <main className='bg-gray-100 w-screen h-screen' >
        <Navbar/>
      <Routes>
      <Route path='/'  element={<Home/>}  />
      <Route path='/exam'  element={<Exam/>}    />
    </Routes>
    </main>
  )
}

export default App
