/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Nav from "../components/navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/google";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userType, setUserType] = useState("patient");
  const [andress, setAndress] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
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
          Usertype: userType,
          Address: andress,
          Phone: phone,
          Zip: zip,
          blocked: [],
          id:user.uid,
        });
        await setDoc(doc(db, "userChat", user.uid), {
          chats: []
        });
      }
      toast.success("user registered successfully", { position: "top-center" });
      window.localStorage.setItem("logged_in", true);
      toast.success("user registered successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <>
      <section className="w-screen h-[100dvh]">
        <Nav />

        <div className="flex flex-col items-center justify-center h-full">
          <form
            onSubmit={handleRegister}
            className="w-[80%] h-full flex flex-col justify-center mb-[4rem] gap-[2rem] p-4 max-[450px]:w-full md:w-[70%] lg:w-[60%] lg:p-8 xl:w-[30%]">
            <h1 className="font-bold text-[2rem] text-[#181940]">
              If you are new , create an account!
            </h1>
            <div className="flex bg-[#eee] gap-2 rounded-lg p-1 ">
              <button
                type="button"
                className={`flex-1 py-2 text-center font-semibold rounded-lg transition-colors duration-300 ${
                  userType === "patient"
                    ? "bg-[#4749b9] text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setUserType("patient")}>
                I'm Patient
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-center font-semibold rounded-lg transition-colors duration-300 ${
                  userType === "dentist"
                    ? "bg-[#4749b9] text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setUserType("dentist")}>
                I'm Dentist
              </button>
            </div>
            {userType === "patient" ? (
              <>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={handleRegister}
                  className="bg-[#4749b9] text-white p-2 rounded cursor-pointer">
                  Register
                </button>
                <GoogleButton />
              </>
            ) : userType === "dentist" ? (
              <>
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-[50%] bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-[50%] bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                  </div>
                  <div className="flex gap-2.5">
                  <input
                    type="text"
                    placeholder="zip code of the office"
                    className="w-[50%] bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                    value={zip}
                    onChange={(e) =>setZip(e.target.value) }
                  />
                  <input
                    type="text"
                    placeholder="Phonne number"
                    className="w-[50%] bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                    value={phone}
                    onChange={(e) =>setPhone(e.target.value) }
                  />
                  </div>
                  <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter your office address"
                  className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                  value={andress}
                  onChange={(e) =>setAndress(e.target.value)} 
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <button
                    
                  onClick={handleRegister}
                  className="bg-[#4749b9] text-white p-2 cursor-pointer rounded">
                  Register
                </button>
              </>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}
