import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import { UserContext } from "../UserContext";
import { BarLoader } from "react-spinners";
import Sidebar from "./Sidebar";
import Nav from "./navbar";

export default function Profile() {
  const { userDetails } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("tab2");

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
      <Nav />

      <section className="flex">
        <Sidebar></Sidebar>
        <section className="h-[100vh] flex-1 overflow-auto">
          {userDetails ? (
            <>
              <section className="w-auto h-auto bg-[#181940] relative flex flex-col items-center justify-center mb-[5rem]">
                <div className="bg-[#181940] w-full h-[20vh] flex flex-col items-center justify-center">
                  <img
                    className="rounded-full h-24 w-24 object-cover"
                    src={userDetails?.photo || "./default-photo.png"}
                    alt="user"
                  />
                </div>
                <div className="w-full h-full z-0 flex gap-[2rem] max-lg:flex-col max-lg:items-center ">
                  {/* Sidebar */}
                  {/* 
    <div className="h-[40vh] max-md:h-auto w-[30%] p-4 flex flex-col gap-[1rem] items-center bg-white rounded-[5px] shadow max-lg:w-full">
      
      <h1 className="text-xl mb-6 max-md:text-[1rem]">
        Welcome, {userDetails?.Firstname || "Guest"}{" "}
        {userDetails?.Lastname || ""}
      </h1>
    </div> */}

                  {/* Main Content */}

                  <div className="bg-white w-full max-lg:w-full h-full flex flex-col">
                    {/* Tabs Navigation */}
                    <div className="w-full p-4 border-b border-gray-300">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setActiveTab("tab2")}
                          className={`p-2 cursor-pointer max-md:text-[1rem] font-[500] ${
                            activeTab === "tab2"
                              ? "border-b-2 border-[#181940] text-[#181940]"
                              : "text-gray-500"
                          }`}
                        >
                          Appointments
                        </button>

                        <button
                          onClick={() => setActiveTab("tab1")}
                          className={`p-2 cursor-pointer max-md:text-[1rem] font-[500] ${
                            activeTab === "tab1"
                              ? "border-b-2 border-[#181940] text-[#181940]"
                              : "text-gray-500"
                          }`}
                        >
                          Personal info
                        </button>

                        {/* <button
            onClick={() => setActiveTab("tab3")}
            className={`p-2 cursor-pointer ${
              activeTab === "tab3"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Tab 3
          </button> */}
                      </div>
                    </div>

                    {/* Tabs Content */}
                    <div className="max-md:h-auto w-full py-8 px-8 max-md:p-4">
                      {activeTab === "tab1" && (
                        <div className="grid grid-cols-2 gap-8 h-auto max-md:flex max-md:flex-col">
                          <div className="flex flex-col gap-2">
                            <h1 className="max-md:text-[1rem] text-[#181940] font-[500]">
                              First Name
                            </h1>
                            <input
                              disabled
                              className="bg-[#f7f7f7] rounded-[5px] text-[#1e1e1e] py-2 px-4 outline-none select-none max-md:text-[.85rem] font-[500]"
                              value={userDetails?.Firstname || "N/A"}
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <h1 className="max-md:text-[1rem] text-[#181940] font-[500]">
                              Last Name
                            </h1>
                            <input
                              disabled
                              className="bg-[#f7f7f7] rounded-[5px] text-[#1e1e1e] py-2 px-4 outline-none select-none max-md:text-[.85rem] font-[500]"
                              value={userDetails?.Lastname || "N/A"}
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <h1 className="max-md:text-[1rem] text-[#181940] font-[500]">
                              Phone Number
                            </h1>
                            <input
                              disabled
                              className="bg-[#f7f7f7] rounded-[5px] text-[#1e1e1e] py-2 px-4 outline-none select-none max-md:text-[.85rem] font-[500]"
                              value={userDetails?.phoneNumber || "N/A"}
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <h1 className="max-md:text-[1rem] text-[#181940] font-[500]">
                              E-mail address
                            </h1>
                            <input
                              disabled
                              className="bg-[#f7f7f7] rounded-[5px] text-[#1e1e1e] py-2 px-4 outline-none select-none max-md:text-[.85rem] font-[500]"
                              value={userDetails?.email || "N/A"}
                            />
                          </div>
                          <div className="w-full max-md:pt-4 max-md:p-0 max-md:border-t-1 max-md:border-[#eee]">
                            <button
                              onClick={handLogout}
                              className="relative cursor-pointer overflow-hidden rounded px-[2rem] py-2.5 text-white transition-all duration-200 bg-red-500 hover:ring-offset-2 active:ring-2 active:ring-neutral-800"
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      )}

                      {activeTab === "tab2" && (
                        <div className="h-auto flex flex-col items-center justify-center">
                          <p>No appointments available</p>
                        </div>
                      )}

                      {/* {activeTab === "tab3" && (
          <div className="h-full flex items-center justify-center">
            <p>Content for Tab 3</p>
          </div>
        )} */}
                    </div>
                  </div>
                </div>{" "}
              </section>
            </>
          ) : (
            <section className="w-full h-[100dvh] flex items-center justify-center">
              <BarLoader color="#134cbc" height={4} width={150} />
            </section>
          )}
        </section>
      </section>
    </>
  );
}
