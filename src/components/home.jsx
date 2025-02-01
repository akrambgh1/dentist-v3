import Nav from "./navbar";
import { Link } from "react-router-dom";
import Card from "./Card";
import { Hospital ,Calendar ,Check ,NotebookPen } from "lucide-react";

export default function Home() {
  return (
    <>
      <Nav />
      <section className="flex flex-col min-h-screen gap-[2rem] mb-[5rem]">
        <section className="w-full p-4 flex justify-between items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <h1 className="text-[1.5rem] font-[500]">Dentist</h1>
          <Link to="/login">
            <button className="px-8 py-2 bg-[#4749b9] text-white rounded-[5px]">
              Log In
            </button>
          </Link>
        </section>

        <section className="w-full h-auto">
          <div className="h-auto w-full p-4 flex-col flex items-center justify-center gap-[1.5rem]">
            <h1 className="text-[#181940] text-[1.75rem] font-bold">
              Connecting Patients with Top Dentists Effortlessly !
            </h1>
            <h2 className="text-[#7d7d7d]">
              Find the right dentist, book appointments, and explore
              professional profiles—all in one place.
            </h2>
          </div>
        </section>

        <section className="flex flex-col p-4">
          <h1 className="text-[1.5rem] font-bold text-[#181940]">
            Why use Dentist ?
          </h1>

          <div className="flex flex-col gap-[1rem]">
            <h1 className="text-[1.15rem] font-[500] p-4 text-[#181940]">
              1- For Patients
            </h1>
            <Card
              icon={Hospital}
              title="Find the right Dentist"
              description="Easily browse a network of professional dentists, view their specialties, and choose the one that best fits your needs. No more guessing—just the right care at the right time."
            ></Card>

            <Card
              icon={Calendar }
              title="Book Appointments Seamlessly"
              description="Forget long wait times and phone calls. Schedule your dental visits with just a few clicks, and get reminders so you never miss an appointment."
            ></Card>
          </div>

          <div className="flex flex-col gap-[1rem] mt-[1rem]">
            <h1 className="text-[1.15rem] font-[500] p-4 text-[#181940]">
              1- For Dentists
            </h1>
            <Card
              icon={Check }
              title="Showcase your expertise"
              description="Dentists can create a professional profile, highlight their skills, and attract more patients by building trust and credibility."
            ></Card>

            <Card
              icon={NotebookPen }
              title=" Manage Your Schedule"
              description="Keep your calendar organized with a simple, intuitive booking system. Set your availability, confirm appointments, and focus on what you do best—caring for your patients."
            ></Card>
          </div>
        </section>

        <section className="w-full px-4 py-8 bg-[#181940] text-center flex flex-col justify-center items-center gap-[1rem]">
            <h1 className="text-white text-[1.5rem] font-[600]">Join today and experience the future of dental care.</h1>
            <Link to="/login">
            <button className="px-8 py-2 bg-[#4749b9] text-white font-[500] rounded-[5px]">
              Start Here
            </button>
          </Link>
        </section>

        <div className="w-full mb-[2rem] text-center">© Dentist. All rights reserved.</div>
      </section>
    </>
  );
}
