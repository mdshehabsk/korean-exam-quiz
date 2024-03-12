
import { LOGO } from "../utils/logo"

const Navbar = () => {
  return (
    <>
    <nav className="bg-grey-50 py-4 px-2 shadow-md " >
        <div className="container">
            <div className="flex justify-between items-center">
                <div>
                    <a href="#">Home</a>
                </div>
                <div className="hidden md:block"  >
                    <h1 className="text-green-500 text-bold text-2xl " >নিশাত কোরিয়ান ভাষা  <span className="text-red-500" >কোচিং সেন্টার</span> </h1>
                </div>
                <div className="flex gap-2 items-center" >
                    <img className="max-h-[40px] max-w-[40px]" src={LOGO.callIcon} alt="" />
                    <p>01612212699</p>
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar