import Sidebar from "../components/Sidebar";
import { useUserStore } from "../components/userStore";
import Nav from "../components/navbar";

export default function Dentistprofile() {
  const { userDetails } = useUserStore();

  return (
    <>
    
<Nav></Nav>
      <section className="flex max-md:mb-[7rem]">
        
        <Sidebar></Sidebar>

        <section className="h-[100vh] flex-1 overflow-y-scroll p-8 max-md:p-0 max-md:h-auto">
          <section className="w-full h-full rounded-[20px] max-md:rounded-none flex flex-col gap-[2rem]">

                <div className="h-auto w-full rounded-[20px] border-[1px] border-[#eff2f1] flex flex-col justify-between gap-[2rem] max-md:gap-2 pb-[1rem] max-md:border-0 max-md:border-b-[1px]">
                  <div className="h-[30vh] bg-[url('public/bg.jpg')] bg-center bg-cover rounded-t-[20px] max-md:rounded-none relative">
                    <img
                      className="rounded-full h-28 w-28 object-cover absolute bottom-[-15%] left-[3%] max-md:left-1/2 max-md:top-1/2 max-md:-translate-y-1/2 max-md:transform max-md:-translate-x-1/2  bg-white"

                      src={userDetails?.photo || "./public/profilepi.jpg"}
                      alt="user"
                    />
                  </div>
                  <div className="flex px-8 py-4 max-md:px-4">
                    <div className="flex flex-col gap-[.25rem] max-md:w-full max-md:items-center max-md:justify-center">
                      <h1 className="text-[2rem] font-[500] max-md:text-[1.75rem]">Mehdi Bechami</h1>
                      <h1 className="text-[1.25rem] text-[#7994a4] max-md:text-[1rem]">
                        {userDetails?.email || "N/A"}
                      </h1>
                      <h1 className="text-[1.25rem] text-[#7994a4] max-md:text-[1rem]">
                        Algeria / Algiers
                      </h1>
                      <button className="relative w-fit mt-[1rem] overflow-hidden rounded bg-[#181940] px-[4rem] max-md:px-0 max-md:w-full py-2.5 text-white transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
                        <span className="relative">Chat</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border-[1px] border-[#eff2f1] p-4 rounded-[15px] gap-[1rem] px-8 max-md:px-4">
                        <h1 className="text-[1.5rem] font-[500]">
                          Personal information
                        </h1>

                        <div className="grid grid-cols-2 gap-[2rem] gap-x-[6rem] max-md:flex max-md:flex-col">
                          <div className="flex flex-col">
                            <h1 className="text-[#7994a4]">First Name</h1>
                            <h1 className="">
                              {userDetails?.Firstname || "N/A"}
                            </h1>
                          </div>

                          <div className="flex flex-col">
                            <h1 className="text-[#7994a4]">Last Name</h1>
                            <h1 className="">
                              {userDetails?.Lastname || "N/A"}
                            </h1>
                          </div>

                          <div className="flex flex-col overflow-hidden">
                            <h1 className="text-[#7994a4]">E-mail address</h1>
                            <h1 className="">{userDetails?.email || "N/A"}</h1>
                          </div>

                          <div className="flex flex-col">
                            <h1 className="text-[#7994a4]">Phone Number</h1>
                            <h1 className="">{userDetails?.phone || "N/A"}</h1>
                          </div>
                        </div>
                      </div>

          </section>
        </section>
      </section>
      </>
)}
