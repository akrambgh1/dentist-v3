/* eslint-disable no-unused-vars */
import Nav from "./navbar";
import { Link } from "react-router-dom";
import Card from "./Card";
import { Hospital, Calendar, Check, NotebookPen } from "lucide-react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import Sidebar from "./Sidebar";
import { Button2 } from "./Button";

export default function Home() {
  const loggedIn = window.localStorage.getItem("logged_in");
  const { userDetails } = useContext(UserContext);

  return (
    <>
      <Nav />

      <section className="flex min-h-screen h-auto">
        <Sidebar></Sidebar>
        <section className="h-[100vh] flex-1 overflow-y-scroll">
          <section className="flex flex-col min-h-screen gap-[2rem] mb-[7rem] items-center pt-[3rem]">
            <div className="flex flex-col w-[100%] items-center justify-center gap-[3rem] pl-[4rem] pr-[2rem] max-md:px-4">
              <div className="flex flex-col gap-[1rem] w-full mb-[3rem] items-center justify-center h-[50vh] bg-[#f5f5dc] rounded-[20px] px-[2rem] text-center max-md:h-auto max-md:py-[2rem] max-md:px-4">
                <h1 className="text-[4rem] text-[#181940] font-[500] max-xl:text-[2.5rem] max-md:text-[1.75rem]">
                  Connecting Patients with Top Dentists Effortlessly.
                </h1>
                <h2 className="text-[#777] text-[1.75rem] max-xl:text-[1.25rem] max-md:text-[.95rem]">
                  Find the right dentist, book appointments, and explore
                  professional profiles—all in one place.
                </h2>
                <Link to="/Register">
                <Button2 text={"Sign up"}/>
                </Link>
              </div>

              <div className="flex flex-col gap-[2rem]">
                <h1 className="text-[1.5rem] text-[#fff] bg-[#181940] w-fit px-4 py-2 rounded-[10px] font-[500]">
                  Why use Dentist
                </h1>

                <div className="md:grid md:grid-cols-2 gap-8 max-md:flex max-md:flex-col max-md:gap-[2rem]">
                  <Card
                    icon={Hospital}
                    title="Find the right Dentist"
                    description="Easily browse a network of professional dentists, view their specialties, and choose the one that best fits your needs. No more guessing—just the right care at the right time."
                  />

                  <Card
                    icon={Calendar}
                    title="Book Appointments Seamlessly"
                    description="Forget long wait times and phone calls. Schedule your dental visits with just a few clicks, and get reminders so you never miss an appointment."
                  />

                  <Card
                    icon={Check}
                    title="Showcase your expertise"
                    description="Dentists can create a professional profile, highlight their skills, and attract more patients by building trust and credibility."
                  />

                  <Card
                    icon={NotebookPen}
                    title="Manage Your Schedule"
                    description="Keep your calendar organized with a simple, intuitive booking system. Set your availability, confirm appointments, and focus on what you do best—caring for your patients."
                  />

                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
