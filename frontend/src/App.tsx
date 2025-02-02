import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Exam from "./pages/Exam";
import SingleSet from "./pages/SingleSet";


import Layout from "@pages/Admin/Layout";
import Admin from "@pages/Admin/Admin";
import AdminSingleSet from '@pages/Admin/SingleSet'
import AddQuestion from "@pages/Admin/AddQuestion";
import NotFound from "@pages/NotFound";
function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')
  return (
    <main className="bg-gray-100 w-full h-full">
      <>
        {!isAdminPage && <Navbar />}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route index  element={<Exam />} />
          <Route path="/set/:id" element={<SingleSet />} />
          {/* all admin page are here */}
          <Route path="admin" element={<Layout />}>
            <Route index element={<Admin/>} />
            <Route path="add-question" element={<AddQuestion />} />
            <Route path="set/:id"  element={<AdminSingleSet/>} />
          </Route>

          {/* not found page */}
          <Route path="not-found"   element={<NotFound/>} />
          <Route path="*"   element={<NotFound/>} />
        </Routes>
      </>
    
    </main>
  );
}

export default App;
