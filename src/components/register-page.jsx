import React, { useState } from "react";
import Nav from "./navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./google";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
 const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) { 
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          Lastname: lname,
          Firstname: fname,
          
        });
        
      }
      toast.success("user registered successfully",{position:"top-center",});
      setTimeout(() => {
        navigate("/Profile");
      }, 1000);
      
    } catch (error) {
      toast.error(error.message,{position:"top-center",});
    }
    
  };
 
 

  return (
    <>
      <section className="w-screen h-screen bg-gray-900">
        <Nav />
        <div className="flex flex-col items-center justify-center h-[80%]">
          <h1 className="text-white text-xl text-gray-500 mb-6">Register</h1>
          <form onSubmit={handleRegister} className="flex flex-col items-center ">
            <input
              type="text"
              placeholder="First name"
              className="bg-gray-800 text-white p-2 mb-4"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              className="bg-gray-800 text-white p-2 mb-4"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
           
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-800 text-white p-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-800 text-white p-2 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button  className="bg-gray-800 text-white p-2 cursor-pointer">
              Register
            </button>
            
          </form>
          <GoogleButton />
        </div>
      </section>
    </>
  );
}
