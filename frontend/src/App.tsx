
import './App.css'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Exam from './pages/Exam'
import SingleSet from './pages/SingleSet'
import Admin from './pages/Admin/Admin'
import AdminIndex from '@pages/Admin/index'
const isAdminPage = window.location.pathname.startsWith("/admin");
function App() {


  return (
    <main className='bg-gray-100 w-full h-full' >
      <>
     {!isAdminPage &&    <Navbar/>}
      <Routes>
      <Route path='/'  element={<Home/>}  />
      <Route path='/exam'  element={<Exam/>}    />
      <Route path='/set/:id' element={<SingleSet/>}  />
        {/* all admin page are here */}
        <Route path="admin" element={<Admin />}>
          <Route index element={<h1>hello world</h1>} />
        </Route>
    </Routes>
      </>
    </main>
  )
}

export default App
