import { useState } from "react";
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
          Firstname: fname
        });
      }
      toast.success("user registered successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/Profile");
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
            className="w-[80%] h-full flex flex-col justify-center mb-[4rem] gap-[2rem] p-4 max-[450px]:w-full md:w-[70%] lg:w-[60%] lg:p-8 xl:w-[30%]"
          >
            <h1 className="font-bold text-[2rem] text-[#181940]">If you are new , create an account!</h1>
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
            <button className="bg-[#4749b9] text-white p-2 cursor-pointer">
              Register
            </button>
            <GoogleButton />
          </form>
        </div>
      </section>
    </>
  );
}
