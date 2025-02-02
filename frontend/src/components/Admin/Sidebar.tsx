import { BiBarChart } from "react-icons/bi";

import { RxPadding } from "react-icons/rx";
import { RiMenu2Fill } from "react-icons/ri";
// import { CiSettings } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";

import { RxCross2 } from "react-icons/rx";

import { sidebarClose } from "@toolkit/Admin/AdminSidebarSlice";

const sidebarItems = [
  {
    id: 1,
    name: "Overview",
    icon: BiBarChart,
    link: "/admin",
  },
  {
    id: 2,
    name: "Add Question",
    icon: RxPadding,
    link: "/admin/add-question",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { sidebarShow } = useAppSelector((state) => state.adminSidebar);
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className={`w-screen h-screen  bg-black/30 absolute top-0 left-0 right-0 z-10 ${
          sidebarShow ? "block" : "hidden"
        } md:hidden `}
        onClick={() => dispatch(sidebarClose())}
      ></div>
      <div
        className={` min-w-[250px] md:basis-[23%] h-full bg-gray-800  overflow-x-hidden ${
          sidebarShow ? "left-0" : "-left-full"
        }  fixed md:left-0  md:static z-20 transition-["position"]  duration-300 `}
      >
        <div className="p-3 text-white flex items-center gap-2 ">
          <div className="flex items-center gap-1  ">
            {sidebarShow ? (
              <RxCross2
                className="text-3xl cursor-pointer "
                onClick={() => dispatch(sidebarClose())}
              />
            ) : (
              <RiMenu2Fill className="text-xl" />
            )}
            <span className=" ml-[15px] text-xl "> Dashboard </span>
          </div>
        </div>

        <ul className="mt-[50px]">
          {sidebarItems.map((item, index) =>
            item.link ? (
              <Link
                key={index}
                className={`text-white flex flex-wrap items-center ${
                  location.pathname === item?.link
                    ? "bg-gray-700"
                    : "bg-transparent"
                }  transition-['background']  w-full  `}
                to={item.link}
              >
                <div
                  className={`flex items-center gap-2  hover:bg-gray-700 transition-['background'] p-3 w-full `}
                >
                  <item.icon className="text-xl" />
                  <span className=""> {item.name} </span>
                </div>
              </Link>
            ) : (
              <li
                key={item.id}
                className="text-white flex flex-wrap items-center  "
              >
                <div
                  className={`flex items-center gap-2  hover:bg-gray-700 transition-['background'] p-3 w-full  `}
                >
                  <item.icon className="text-xl" />
                  <span className=""> {item.name} </span>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
