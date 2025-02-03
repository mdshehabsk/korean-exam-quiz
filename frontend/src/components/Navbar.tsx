
import { LOGO } from "../utils/logo"
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
    <nav className="bg-grey-50 py-4 px-2 shadow-md " >
        <div className="container">
            <div className="flex justify-between items-center">
                <div>
                    <Link to="/">Home</Link>
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