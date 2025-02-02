import Sidebar from "@components/Admin/Sidebar"
import { useAppDispatch } from "@toolkit/hook"
import { sidebarOpen } from '@toolkit/Admin/AdminSidebarSlice'
import { Outlet } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";

const Layout = () => {
  const dispath = useAppDispatch()
  function sidebarShow () {
    dispath(sidebarOpen())
  }
  return (
   <div className="flex w-screen h-screen   " >
    <Sidebar/>

    <div className="flex-1 bg-gray-200 p-2 md:p-4 overflow-y-auto " >
      <div className="flex justify-between items-center py-4 bg-slate-100 px-4 md:hidden ">
        <h1 className="text-xl" >Dashboard</h1>
        <GiHamburgerMenu className="text-2xl" onClick={sidebarShow} />
      </div>
    <div className="my-8 md:my-0">
    <Outlet/>
    </div>
    </div>
   </div>
  )
}

export default Layout