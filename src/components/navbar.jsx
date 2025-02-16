import {
  House,
  UserRound,
  Search,
  MessageCircle,
  Calendar,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";


export default function Nav() {
  const loggedIn = window.localStorage.getItem("logged_in");
  const navigate = useNavigate();
  const handleProNav = () => {
    if (loggedIn) {
      navigate("/Profile");
    } else {
      navigate("/Login");
    };
  };
  return (
    <>
      {/* <nav>
        <ul className="flex justify-center gap-10 bg-gray-800 text-white p-4">
          <li>
            <Link to="/register">Reginster</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav> */}

      {/* mobile navbar  */}

      <section className="fixed bottom-0 left-0 bg-[#fff] w-full py-[1rem] transition-all duration-200 /* md:hidden */ flex justify-between items-center border-t-1 border-[#e8e8e8] px-[1rem] z-10">
        <Link to="/">
          <div className="flex flex-col gap-[.25rem] items-center justify-center">
            <House stroke="#111238" size={21} />
            <h1 className="text-[#111238] font-[500]">Home</h1>
          </div>
        </Link>
      <Link to="/Search">
        <div className="flex flex-col gap-[.25rem]  items-center justify-center">
          <Search stroke="#111238" size={21} />
          <h1 className="text-[#111238] font-[500]">Search</h1>
        </div></Link>

        <div className="flex flex-col gap-[.25rem]  items-center justify-center">
          <Calendar stroke="#111238" size={21} />
          <h1 className="text-[#111238] font-[500]">Appt</h1>
        </div>

        <div className="flex flex-col gap-[.25rem]  items-center justify-center">
          <MessageCircle stroke="#111238" size={21} />
          <h1 className="text-[#111238] font-[500]">Chat</h1>
        </div>

        
          <div onClick={handleProNav} className="flex flex-col gap-[.25rem]  items-center justify-center">
            <UserRound stroke="#111238" size={21} />
            <h1 className="text-[#111238] font-[500]">Profile</h1>
          </div>
        
      </section>
    </>
  );
}
