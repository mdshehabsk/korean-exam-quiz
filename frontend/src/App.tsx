
import './App.css'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Exam from './pages/Exam'
import SingleSet from './pages/SingleSet'
import Admin from './pages/Admin'
function App() {


  return (
    <main className='bg-gray-100 w-full h-full' >
      <>
        <Navbar/>
      <Routes>
      <Route path='/'  element={<Home/>}  />
      <Route path='/exam'  element={<Exam/>}    />
      <Route path='/set/:id' element={<SingleSet/>}  />
      <Route path='/admin' element={<Admin/>}  />
    </Routes>
      </>
    </main>
  )
}

export default App
