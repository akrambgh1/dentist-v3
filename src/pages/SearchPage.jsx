/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../components/Sidebar";
import { Search } from "lucide-react";
import { CalendarForm } from "../components/ui/CalendarForm";
import DoctorCard from "../components/DoctorCard";
import Nav from "../components/navbar";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, } from "firebase/firestore";

import { db } from "../components/firebase";

export default function SearchPage() {
  const [date, setDate] = React.useState(new Date());
  const [hideNavbar, setHideNavbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [istyping, setIstyping] = useState(false);
  const [users, setUsers] = useState([]);
   useEffect(() => {
      const fetchUsers = async () => {
        if (!searchTerm.trim()) {
          setUsers([]);
         
          return;
        }
  
        try {
          const usersRef = collection(db, "users");
          const q = query(
            usersRef,
           
            where("lowercasedName", ">=", searchTerm),
            where("lowercasedName", "<=", searchTerm + "\uf8ff"),
            where("Usertype", "==", "dentist")
          );
  
        
          const querySnapshot = await getDocs(q);
          const usersList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setUsers(usersList);
        } catch (error) {
          console.error("Error searching users:", error);
        }
      };
      
      fetchUsers();
    }, [searchTerm,]);
    const handleInputChange = async (e) => {
      setIstyping(true);
      setSearchTerm(e.target.value.toLowerCase());
      
      
      
    };
  return (
    <>
    {!hideNavbar && <Nav />}
      <section className="flex min-h-dvh h-auto bg-[#f3f5f7]">
        <Sidebar></Sidebar>
        <section className="h-[100dvh] flex-1 overflow-y-scroll">

          <div className="w-full p-8 pl-[3rem] flex justify-center items-center gap-[2rem] max-md:p-4 max-md:pl-[1rem]">
            <div className="flex h-fit items-center border-[#eee] border-[1px] w-[60%] max-lg:w-full py-2 pl-[.5rem] pr-[1rem] rounded-[15px] gap-[1rem] bg-white">
              <Search size={24}/>
              
              <input type="text" onChange={handleInputChange} className="outline-none border-0 w-full" />
            {istyping && (
              users.length > 0 ? (
                users.map((user) => (
                  <div className="flex items-center gap-1.5 justify-between mt-4" key={user.id}>
                    <div className="flex items-center gap-1.5">
                      <img
                      src={user.photo || "profilepi.jpg"}
                      alt={user.Firstname}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h1 className="text-[1.25rem] font-[600]">{user.Firstname}</h1>
                    </div>
                    
                    <div>
                      <button onClick={() => handleAddingUser(user)} className="p-1 bg-blue-950 rounded text-white">
                        add user
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`mt-2 pl-2 ${istyping ? "" : ""}`}>No users found</p>
              )
            )} </div>
           
              <CalendarForm
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={undefined}
                className="rounded-md h-full"
              />
          </div>

          <div className="flex flex-col w-full px-[2rem] max-lg:px-[1rem] max-md:px-2">
            {/* <DoctorCard setHideNavbar={setHideNavbar} /> */}
          </div>
        </section>
      </section>
    </>
  );
}
