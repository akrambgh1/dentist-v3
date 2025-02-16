/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../components/Sidebar";
import { Search } from "lucide-react";
import { CalendarForm } from "../components/ui/CalendarForm";
import DoctorCard from "../components/DoctorCard";
import Nav from "../components/navbar";
import { useState } from "react";

export default function SearchPage() {
  const [date, setDate] = React.useState(new Date());
  const [hideNavbar, setHideNavbar] = useState(false);

  return (
    <>
    {!hideNavbar && <Nav />}
      <section className="flex min-h-dvh h-auto bg-[#f3f5f7]">
        <Sidebar></Sidebar>
        <section className="h-[100dvh] flex-1 overflow-y-scroll">

          <div className="w-full p-8 pl-[3rem] flex justify-center items-center gap-[2rem] max-md:p-4 max-md:pl-[1rem]">
            <div className="flex h-fit items-center border-[#eee] border-[1px] w-[60%] max-lg:w-full py-2 pl-[.5rem] pr-[1rem] rounded-[15px] gap-[1rem] bg-white">
              <Search size={24}/>
              <input type="text" className="outline-none border-0 w-full" />
            </div>

              <CalendarForm
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={undefined}
                className="rounded-md h-full"
              />
          </div>

          <div className="flex flex-col w-full px-[2rem] max-lg:px-[1rem] max-md:px-2">
            <DoctorCard setHideNavbar={setHideNavbar} />
          </div>
        </section>
      </section>
    </>
  );
}
