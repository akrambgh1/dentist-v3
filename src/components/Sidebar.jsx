/* eslint-disable no-undef */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  Search,
  MessagesSquare,
  Calendar,
  UserRound,
  ArrowRight
} from "lucide-react";
// import FileDropArea from "./Filedrop";

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const location = useLocation(); // Get the current URL

  const toggleActive = () => {
    setIsActive((prev) => {
      if (!prev) {
        setTimeout(() => {
          setIsTextVisible(true);
        }, 100);
      } else {
        setIsTextVisible(false);
      }
      return !prev;
    });
  };

  // Menu items with their respective paths
  const menuItems = [
    { name: "Home", path: "/", icon: House },
    { name: "Search", path: "/Search", icon: Search },
    { name: "Messages", path: "/g", icon: MessagesSquare },
    { name: "Appointments", path: "/f", icon: Calendar },
    { name: "Profile", path: "/profile", icon: UserRound }
  ];

  return (
    <section
      className={`relative h-screen bg-[#fff] shrink-0 flex flex-col max-md:hidden gap-[3rem] pt-[5rem] px-[2rem] py-[1rem] z-[999] border-r-[1px] border-[#eee]
      ${isActive ? "w-[285px] pl-[2rem] pr-[1rem]" : "w-[120px]"}
      transition-width duration-300 ease-in-out`}
    >
      {/* Sidebar Toggle Button */}
      <div className="flex justify-between relative">Dentist</div>
      <div
        className="p-[.25rem] rounded-[50%] flex items-center justify-center bg-[#e4e4e4] text-[#181940] cursor-pointer absolute top-[20px] right-[-20px]"
        onClick={toggleActive}
      >
        <ArrowRight />
      </div>

      {/* Sidebar Menu */}
      <div className="px-[.5rem] border-y-[1px] border-[#eee] py-8">
        <ul className="flex flex-col gap-[1rem] text-[#88898b] font-[500]">
          {menuItems.map(({ name, path, icon: Icon }) => {
            const isActivePage = location.pathname === path;

            return (
              <Link key={path || `menu-item-${index}`} to={path || "#"}>
                <li
                  className={`flex gap-[1.5rem] items-center p-2 cursor-pointer hover:text-[#181940] transition-colors w-full duration-200
                  ${
                    isActivePage
                      ? "text-[#efefef] bg-[#181940] rounded-[10px] hover:text-white"
                      : ""
                  }`}
                >
                  <Icon className={`w-[24px] h-[24px] flex-shrink-0 text-[#181940] ${
                    isActivePage
                      ? "text-[#efefef] bg-[#181940] rounded-[10px] hover:text-white"
                      : ""
                  }`} />

                  {isActive && isTextVisible && (
                    <h1 className={`transition-opacity duration-300`}>
                      {name}
                    </h1>
                  )}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col absolute bottom-[2rem] gap-[3rem] items-start justify-center">
        {/* User Info at the Bottom */}
        {/* replace the name and the email by the user full name and email */}
        <div className="flex w-full left-0 gap-[.5rem] items-center justify-between">
          <div className="w-[2.5rem] h-[2.5rem] rounded-[50%] bg-[#181940]"></div>
          <div>
            {isActive && isTextVisible && (
              <h1 className="transition-opacity duration-400 text-[#88898b] cursor-pointer text-[.85rem]">
                John Doe
              </h1>
            )}
            {isActive && isTextVisible && (
              <h2 className="transition-opacity duration-400 text-[#88898b] cursor-pointer text-[.85rem]">
                johndoe@gmail.com
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
