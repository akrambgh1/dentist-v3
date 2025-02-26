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

export default function SearchPage() {
  const [date, setDate] = React.useState(new Date());
  const [hideNavbar, setHideNavbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [istyping, setIstyping] = useState(false);
  const [users, setUsers] = useState([]);
  const { userDetails } = useUserStore();
  const { changeChat } = useChatStore();

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
  return (
    <>
      {!hideNavbar && <Nav />}
      <section className="flex min-h-dvh h-auto bg-[#ffffff]">
        <Sidebar></Sidebar>
        <section className="h-[100dvh] flex-1 overflow-y-scroll">
          <div className="w-full p-8 pl-[3rem] flex justify-center items-center gap-[2rem] max-md:p-4 max-md:pl-[1rem]">
            <div className="flex h-fit items-center border-[#eee] border-[1px] w-[60%] max-lg:w-full py-2 pl-[.5rem] pr-[1rem] rounded-[15px] gap-[1rem] bg-white">
              <Search size={24} />

              <input
                type="text"
                onChange={handleInputChange}
                className="outline-none border-0 w-full"
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

          <div className="flex flex-col gap-[1rem] w-full px-[2rem] max-lg:px-[1rem] max-md:px-2 max-md:gap-4">
            {/* <DoctorCard setHideNavbar={setHideNavbar} /> */}
            {/*Haylik ta7b takhdam biha bra7tak*/}
            {users &&
              (users.length > 0 ? (
                users.map((user) => (
                  <div
                    className="flex items-center gap-3 justify-between mt-4 max-md:flex-col bg-[#f4f4fb] p-4 rounded-[20px] flex-col"
                    key={user.id}
                  >
                    <div className="w-full gap-[1rem] flex justify-between">
                      <div className="flex items-center gap-1.5 max-md:w-full">
                        <img
                          src={user.photo || "profilepi.jpg"}
                          alt={user.Firstname}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <h1 className="text-[1.25rem] font-[600]">
                          {user.Firstname}
                        </h1>
                      </div>

                      <div className="bg-[#e0e1f3] w-fit rounded-[20px] px-2 py-1 flex gap-[.75rem] items-center justify-center max-md:px-3">
                        <Star
                          size={12}
                          className="text-[#181940]"
                          fill="#181940"
                        ></Star>
                        <h1 className="text-[.75rem]">4.8</h1>
                      </div>
                    </div>

                    <div className="flex max-lg:flex-col w-full max-lg:gap-[1rem]">
                      <div className="flex gap-2 items-center justify-center bg-[#e0e1f3] px-4 py-2 rounded-[5px] max-lg:w-full w-[60%]">
                        <h1>Next appointment :</h1>
                        <div className="flex items-center justify-center gap-2">
                        <Clock size={15}/>
                        <h1>26/02/2025</h1>
                        </div>
                      </div>


                    <div className="flex gap-2 items-center w-full justify-end">
                      <button
                        onClick={() => handleAddingUser(user)}
                        className="px-4 py-2 bg-blue-950 rounded text-white w-fit max-lg:w-[30%]"
                      >
                        Chat
                      </button>
                      <button className="px-4 py-2 bg-blue-950 rounded text-white w-fit max-lg:w-[70%]">
                        make an appointment
                      </button>
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
