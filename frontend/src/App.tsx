import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Exam from "./pages/Exam";
import SingleSet from "./pages/SingleSet";
import Admin from "./pages/Admin/Admin";
import AdminIndex from "@pages/Admin/index";
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
          <Route path="admin" element={<Admin />}>
            <Route index element={<h1>hello world</h1>} />
            <Route path="add-question" element={<AddQuestion />} />
          </Route>

          {/* not found page */}

          <Route path="*"   element={<NotFound/>} />
        </Routes>
      </>
    </main>
  );
}

export default App;
