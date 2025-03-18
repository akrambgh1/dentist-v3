/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../components/Sidebar";
import { Search } from "lucide-react";
import { CalendarForm } from "../components/ui/CalendarForm";
import DoctorCard from "../components/DoctorCard";
import Nav from "../components/navbar";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../components/userChatStore";
import { db } from "../components/firebase";
import { useUserStore } from "../components/userStore";
import { Star, Clock } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { MapPin } from 'lucide-react';

export default function SearchPage() {
  const [date, setDate] = React.useState(new Date());
  const [hideNavbar, setHideNavbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [istyping, setIstyping] = useState(false);
  const [users, setUsers] = useState([]);
  const { userDetails } = useUserStore();
  const { changeChat } = useChatStore();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
const [DoctorCard, setDoctorCard] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAppointmentClick = (user) => {

      setShowAppointmentModal(true);
      setHideNavbar(true);
      setDoctorCard(user)// Hide navbar when modal opens

  };

  const closeModal = () => {
    setShowAppointmentModal(false);
    setDoctorCard([])
    setTimeout(() => {
      setHideNavbar(false);
    }, 30);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,

          where("Usertype", "==", "dentist")
        );

        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleInputChange = async (e) => {
    setIstyping(true);
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleAddingUser = async (user) => {
    if (!user.id || !userDetails?.id) return;
    if (user.id === userDetails?.id) return;

    try {
      const chatRef = collection(db, "Chats");
      const userChatRef = collection(db, "userChat");

      const chatId =
        userDetails.id > user.id
          ? `${userDetails.id}_${user.id}`
          : `${user.id}_${userDetails.id}`;

      const chatDocRef = doc(chatRef, chatId);
      const chatSnap = await getDoc(chatDocRef);
      if (chatSnap.exists()) {
        changeChat(chatId, user);
      }
      if (!chatSnap.exists()) {
        await setDoc(chatDocRef, {
          createdAt: serverTimestamp(),
          messages: [],
          users: [userDetails.id, user.id]
        });

        const userChatSenderRef = doc(userChatRef, userDetails.id);
        const userChatReceiverRef = doc(userChatRef, user.id);

        await setDoc(
          userChatSenderRef,
          {
            chats: {
              [chatId]: {
                lastMessage: "",
                receiverId: user.id,
                updatedAt: serverTimestamp(),
                isTyping: false,
                isNewMessage: false
              }
            }
          },
          { merge: true }
        );

        await setDoc(
          userChatReceiverRef,
          {
            chats: {
              [chatId]: {
                lastMessage: "",
                receiverId: userDetails.id,
                updatedAt: serverTimestamp(),
                isTyping: false,
                isNewMessage: false
              }
            }
          },
          { merge: true }
        );
        changeChat(chatId, user);
      }
      console.log("✅ New chat added:", chatId);
    } catch (error) {
      console.error("🔥 Error adding user to chat:", error);
    }
    setTimeout(() => {
      navigate("/Inbox");
    }, 1000);
  };
  const Navigate = (user) => {
    navigate(`/dentist/${user.id}`, { state: { user } });
  };
  return (
    <>
      {!hideNavbar && <Nav />}
      <section className="flex min-h-screen h-auto">
        <Sidebar></Sidebar>
        <section className="h-[100dvh] flex-1 overflow-y-scroll">
          <div className="w-full p-8 pl-[3rem] flex flex-col justify-center items-center gap-[1rem] max-md:p-4 max-md:pl-[1rem] bg-[#ffffff]">
            {/* <div className="rounded-2xl flex w-full py-2 px-2 gap-4 cursor-pointer">
              <img
                className="rounded-full w-14 h-14 object-cover"
                src={userDetails?.photo || "/profilepi.jpg"}
                alt="Profile"
              />
              <div className="w-full flex flex-col gap-[.15rem]">
                <div className="flex flex-col justify-between ">
                  <h1 className="text-sm text-[#000]">Hello</h1>
                  <span className="text-xl text-[#000] font-[450]">
                    {userDetails?.Lastname || "N/A"}{" "}
                    {userDetails?.Firstname || "N/A"}
                  </span>
                </div>
              </div>
            </div> */}
            <div className="flex h-fit items-center border-[#eee] text-black border-[1px] w-[60%] max-lg:w-full py-2 pl-[.5rem] pr-[1rem] rounded-[15px] gap-[1rem]">
              <Search size={24} />

              <input
                type="text"
                onChange={handleInputChange}
                className="outline-none border-0 w-full bg-transparent text-black"
                placeholder="Search for a dentist...."
              />
            </div>

            <CalendarForm
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={undefined}
              className="rounded-md h-full"
            />
          </div>

          <div className="max-md:flex max-md:flex-col grid grid-cols-2 gap-[1rem] w-full overflow-y-scroll px-[1rem] max-lg:px-[1rem] max-md:px-1 max-md:pb-[1rem]">
            {/* <DoctorCard setHideNavbar={setHideNavbar} /> */}
            {/*Haylik ta7b takhdam biha bra7tak*/}
            {users &&
              (users.length > 0 ? (
                users.map((user) => (
                  <div
                    className="flex mt-4 gap-2 p-2 rounded-[10px] w-full"
                    key={user.id}
                  >
                    <div className="flex-1 flex-col rounded-[10px] py-1 flex gap-[.5rem] max-md:px-3 ">
                      <div className="flex gap-2 items-center">
                        <div className="w-fit gap-[1rem] flex justify-between">
                          <div className="flex items-center max-md:w-full">
                            <img
                              src={user.photo || "profilepi.jpg"}
                              alt={user.Firstname}
                              className="w-12 h-12 rounded-[10px] object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col-reverse">
                         <h1 className="text-[1.25rem] font-[600]">
                          Dr.{user.Firstname}
                        </h1>
                        <div className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="text-[#181940]"
                            fill="#181940"
                          ></Star>
                          <h1 className="text-[.75rem]">4.8</h1>
                        </div> 
                        </div>
                        
                      </div>

                      <div className="flex gap-2 items-center max-lg:w-full w-[100%]">
                        <Clock size={15} />
                        <h1 className="text-[.75rem]">Next appt:</h1>
                        <div className="flex items-center justify-center gap-2">
                          <h1 className="text-[.75rem]">26/02/2025</h1>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center">
                        <MapPin size={15}/>
                        <h1>Cabinet Address</h1>
                      </div>

                      <div>
                        <button
                          onClick={()=>handleAppointmentClick(user)}
                          className="px-4 py-2 bg-[#18717b] rounded  w-fit max-lg:w-[100%] text-white transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
                        >
                          View details
                        </button>
                      </div>
                    </div>
                    <div>

                        <div
                          className={`fixed bottom-0 max-md:left-0 right-0 overflow-y-scroll max-md:w-full w-[30%] transition-all duration-200 ease flex justify-center border-t border-t-[#e4e4e4] bg-[#ffffff] max-md:rounded-t-[30px] 
                           ${showAppointmentModal ? "h-[80dvh] flex" : "h-0"}`}
                          >
                          <div className="w-full h-full flex flex-col items-center justify-between py-5 gap-[1rem]">
                            <div className="flex flex-col w-full h-fit items-center gap-1">
                              <img
                                className="rounded-full h-24 w-24 object-cover bg-white"
                                src={DoctorCard.photo ||"/profilepi.jpg"}
                                alt="user"
                              />
                              <h1 className="text-[1.5rem]">Dr.{DoctorCard.Lastname}</h1>
                              <h2 className="text-[1rem] text-[#8d8d8d]">
                                {DoctorCard.email}
                              </h2>
                            </div>
                            <div className="w-full flex justify-center"></div>

                            <div></div>

                            <div
                              className={`w-[95%] flex gap-2 pb-[1rem] transition-all duration-300 ease ${
                                showAppointmentModal ? "" : "-translate-y-0"
                              }`}
                            >
                              <button
                                onClick={() => handleAddingUser(DoctorCard)}
                                className="text-white w-[30%] bg-[#181940] rounded-[5px] p-2"
                              >
                                Chat
                              </button>
                              <button
                                onClick={() => Navigate(DoctorCard)}
                                className="text-white w-[70%] bg-[#181940] rounded-[5px] p-2"
                              >
                                View profile
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

                    </div>
                  </div>
                ))
              ) : (
                <p className={`mt-2 pl-2 ${istyping ? "" : ""}`}>
                  No users found
                </p>
              ))}
          </div>
        </section>
      </section>
    </>
  );
}
