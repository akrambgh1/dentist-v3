/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Calendar from "./ui/calendar";

export default function DoctorCard({ setHideNavbar }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAppointmentClick = () => {
    if (isMobile) {
      setShowAppointmentModal(true);
      setHideNavbar(true); // Hide navbar when modal opens
    } else {
      alert("Redirecting to appointment page...");
    }
  };

  const closeModal = () => {
    setShowAppointmentModal(false);
    
    setTimeout(() => {
      setHideNavbar(false);
    }, 350);
  };

  return (
    <>
      <div className="flex gap-[1rem] justify-between w-full items-center border-[1px] bg-white border-[#eee] rounded-[20px] p-4 relative max-md:flex-col max-xl:gap-0 max-md:items-start">
        <div className="flex gap-[1rem] max-md:gap-2">
          <img
            className="rounded-full h-19 w-19 object-cover bg-white max-md:h-15 max-md:w-15"
            src="/profilepi.jpg"
            alt="user"
          />
          <div className="flex flex-col justify-center gap-2 max-md:gap-0">
            <div className="flex items-center gap-2">
              <h1 className="font-[600]">Doctor's Name</h1>
              <div className="bg-[#e0e1f3] w-fit rounded-[20px] px-2 py-1 flex gap-[.5rem] items-center justify-center max-md:absolute max-md:top-[15%] max-md:right-[5%] max-md:px-3">
                <Star
                  size={12}
                  className="text-[#181940]"
                  fill="#181940"
                ></Star>
                <h1 className="text-[.75rem]">4.8</h1>
              </div>
            </div>

            <div className="flex gap-[1rem] max-[500px]:flex-col max-[500px]:gap-0">
              <h2 className="max-[500px]:text-[.75rem] text-[#8d8d8d]">
                15 / 02 / 2025
              </h2>
              <h2 className="max-[500px]:text-[.75rem] text-[#8d8d8d]">
                the doctor's address
              </h2>
            </div>
          </div>
        </div>

        <div className="flex gap-[2rem] items-center justify-center py-4 rounded-xl max-md:w-full max-md:px-2">
          <div className="flex items-center justify-center gap-[1rem] max-md:w-full">
            <button className="relative max-lg:hidden w-fit overflow-hidden rounded bg-[#181940] px-[2rem] max-md:px-0 max-md:w-full py-2.5 text-white transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
              <span className="relative">Chat</span>
            </button>

            <button
              onClick={handleAppointmentClick}
              className="relative w-fit overflow-hidden rounded bg-[#181940] px-[1rem] max-md:px-0 max-md:w-full py-2.5 text-white transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
            >
              <span className="relative">Make an appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      {isMobile && (
        <div
          className={`absolute bottom-0 left-0 overflow-y-scroll pb-4 z-[9999] w-full transition-all duration-200 ease-in-out flex justify-center bg-[#ffffff] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-t-[30px] 
        ${showAppointmentModal ? "h-[80%] flex" : "h-0"}`}
        >
          <div className="w-full h-full flex flex-col items-center py-5 gap-[1rem]">
            <div className="flex flex-col w-full h-fit items-center gap-1">
              <img
                className="rounded-full h-24 w-24 object-cover bg-white"
                src="/profilepi.jpg"
                alt="user"
              />
              <h1 className="text-[1.5rem]">Doctor's Name</h1>
              <h2 className="text-[1rem] text-[#8d8d8d]">
                EmailAddress@gmail.com
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <Calendar className={"w-[90%]"} rowClassName={""} HeadRowClassName={""}></Calendar>
            </div>

            <div className="flex flex-col w-full h-fit items-center gap-1">
              <img
                className="rounded-full h-24 w-24 object-cover bg-white"
                src="/profilepi.jpg"
                alt="user"
              />
              <h1 className="text-[1.5rem]">Doctor's Name</h1>
              <h2 className="text-[1rem] text-[#8d8d8d]">
                EmailAddress@gmail.com
              </h2>
            </div>

            <div className="flex flex-col w-full h-fit items-center gap-1">
              <img
                className="rounded-full h-24 w-24 object-cover bg-white"
                src="/profilepi.jpg"
                alt="user"
              />
              <h1 className="text-[1.5rem]">Doctor's Name</h1>
              <h2 className="text-[1rem] text-[#8d8d8d]">
                EmailAddress@gmail.com
              </h2>
            </div>
            
            
            <div>

            </div>

            <div className={`w-[95%] flex gap-2 transition-all duration-300 ease ${showAppointmentModal ? "" : "-translate-y-0"}`}>
              <button className="text-white w-[30%] bg-[#181940] rounded-[5px] p-2">
                Chat
              </button>
              <button className="text-white w-[70%] bg-[#181940] rounded-[5px] p-2">
                make an appointment
              </button>
            </div>
            <div
              className="absolute top-[5%] left-[5%] bg-[#eee] p-2 rounded-full cursor-pointer"
              onClick={closeModal}
            >
              <ArrowLeft />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
