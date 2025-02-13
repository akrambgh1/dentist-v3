import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../components/firebase";
import { useUserStore } from "../components/userStore";
import { BarLoader } from "react-spinners";
import Sidebar from "../components/Sidebar";
import Nav from "../components/navbar";

export default function Profile() {
  const { userDetails } = useUserStore();
  const [activeTab, setActiveTab] = useState("tab1");

  const navigate = useNavigate();
  async function handLogout() {
    try {
      await auth.signOut();
      toast.success("User logged out successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      window.localStorage.removeItem("logged_in");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <>
      {/* <div className="bg-[#181940] w-full h-[20vh] flex flex-col items-center justify-center">
                  <img
                    className="rounded-full h-24 w-24 object-cover"
                    src={userDetails?.photo || "profilepi.jpg"}
                    alt="user"
                  />
                </div> */}
      <Nav />

      <section className="flex max-md:pb-[5rem]">
        <Sidebar></Sidebar>
        <section className="h-[100vh] flex-1 overflow-auto px-4 py-8 bg-[#fff] flex flex-col gap-[1rem] max-md:h-auto">
          <h1 className="px-8 text-[2rem] w-full max-md:px-0 max-md:text-[1.5rem]">Account Settings</h1>
          <section className="flex p-8 gap-[1rem] h-full w-full bg-white rounded-[20px] border-[1px] border-[#eee] max-md:flex-col max-md:p-0">
            <div className="w-fit h-full max-md:w-full ">
              <ul className="flex md:flex-col gap-[1rem] h-full border-r-[1px] border-r-[#eee] pr-[1rem] max-md:pr-0 max-md:w-full max-md:justify-evenly max-md:mt-[1rem]">
                <li
                  onClick={() => setActiveTab("tab1")}
                  className={`w-fit py-2 px-4 cursor-pointer max-md:text-[1rem] font-[500] text-center max-md:h-fit max-md:p-[.5rem] ${
                    activeTab === "tab1"
                      ? "bg-[#e9f0ff] rounded-[5px] text-[#2c70ec]"
                      : "text-gray-500"
                  }`}
                >
                  Appointments
                </li>

                <li
                  onClick={() => setActiveTab("tab2")}
                  className={`w-fit py-2 px-4 cursor-pointer max-md:text-[1rem] font-[500] text-center max-md:h-fit max-md:p-[.5rem] ${
                    activeTab === "tab2"
                      ? "bg-[#e9f0ff] rounded-[5px] text-[#2c70ec]"
                      : "text-gray-500"
                  }`}
                >
                  Personal info
                </li>
              </ul>
            </div>

            <div className="w-full h-full rounded-[20px] max-md:w-full">
              <div className="h-full w-full px-4 max-md:p-4">
                {activeTab === "tab1" && <></>}

                {activeTab === "tab2" && (
                  <>
                    <div className="w-full h-full flex flex-col gap-[1.5rem]">
                      <h1 className="text-[1.5rem] font-[500]">My profile</h1>
                      <div className="flex gap-[1rem] border-[1px] border-[#eff2f1] p-4 rounded-[15px] overflow-hidden">
                        <img
                          className="rounded-full h-21 w-21 object-cover"
                          src={userDetails?.photo || "profilepi.jpg"}
                          alt="user"
                        />

                        <div className="flex flex-col">
                          <h1 className="text-[1.25rem]">
                            {userDetails?.Firstname || "N/A"}
                          </h1>
                          <h1 className="text-[#7994a4] font-[400]">
                            {userDetails?.Lastname || "N/A"}
                          </h1>
                          <h1 className="text-[#7994a4]">
                            {userDetails?.email || "N/A"}
                          </h1>
                        </div>
                      </div>

                      <div className="flex flex-col border-[1px] border-[#eff2f1] p-4 rounded-[15px] gap-[1rem] px-8 max-md:px-4">
                        <h1 className="text-[1.5rem] font-[500]">
                          My Personal information
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

                      <div className="flex flex-col border-[1px] border-[#eff2f1] p-4 rounded-[15px] gap-[1rem] px-8 max-md:px-4">
                        <div className="grid grid-cols-2 gap-[2rem] gap-x-[6rem] max-md:flex max-md:flex-col">
                          <div className="flex flex-col">
                          <h1 className="text-[#7994a4]">Country</h1>
                          <h1 className="">Algeria</h1>
                        </div>

                        <div className="flex flex-col">
                          <h1 className="text-[#7994a4]">City / State</h1>
                          <h1 className="">Algeria</h1>
                        </div>

                        <div className="flex flex-col">
                          <h1 className="text-[#7994a4]">Postal code</h1>
                          <h1 className="">16000</h1>
                        </div>
                        </div>
                        
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
