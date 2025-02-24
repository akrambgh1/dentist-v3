/* eslint-disable no-unused-vars */
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

      <section className="flex max-md:pb-[5rem]">
        <Sidebar></Sidebar>
        <section className="h-[100vh] flex-1 overflow-auto px-4 py-8 bg-[#fff] flex flex-col gap-[1rem] max-md:h-auto max-md:px-0">
          <section className="flex p-8 gap-[1rem] h-full w-full bg-white rounded-[20px] max-md:flex-col max-md:p-0 max-md:rounded-[0px] items-center justify-center">
            {userDetails ? (
              <div className="w-full h-full rounded-[20px] max-md:w-full">
                <div className="h-full w-full px-4 max-md:p-4">
                  {
                    <>
                      <div className="w-full h-full flex flex-col gap-[1.5rem]">
                        <h1 className="text-[1.5rem] font-[500]">My profile</h1>
                        <div className="flex gap-[1rem] border-[1px] text-white border-[#eff2f1] p-4 rounded-[15px] max-md:px-2 max-md:flex-col items-center bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat">
                          <img
                            className="rounded-full h-21 w-21 object-cover"
                            src={userDetails?.photo || "/profilepi.jpg"}
                            alt="user"
                          />

                          <div className="flex flex-col max-md:items-center">
                            <h1 className="text-[1.25rem] max-[400px]:text-[1rem]">
                              {userDetails?.Firstname || "N/A"}{" "}
                              {userDetails?.Lastname || "N/A"}
                            </h1>

                            <h1 className="text-[#dddddd] max-[400px]:text-[.85rem]">
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
                              <h1 className="">
                                {userDetails?.email || "N/A"}
                              </h1>
                            </div>

                            <div className="flex flex-col">
                              <h1 className="text-[#7994a4]">Phone Number</h1>
                              <h1 className="">
                                {userDetails?.phone || "N/A"}
                              </h1>
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
                        <button className="max-md:w-full w-fit text-white bg-red-500 py-2 px-8 rounded-[5px]">
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  }
                </div>
              </div>
            ) : (
              <section className="w-full h-[80dvh] flex items-center justify-center">
                <BarLoader color="#134cbc" height={4} width={150} />
              </section>
            )}
          </section>
        </section>
      </section>
    </>
  );
}
