/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import GoogleButton from "./google";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/Profile");
      }, 1000);
      window.localStorage.setItem("logged_in" , true);
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (


      <section className="w-screen h-[100dvh] relative flex flex-col items-center justify-center">
        <Nav></Nav>
        <form
          onSubmit={handleLogin}
          className="w-[80%] h-full flex flex-col justify-center gap-[2rem] p-4 max-[450px]:w-full md:w-[70%] lg:w-[60%] lg:p-8 xl:w-[30%]"
        >
          <h1 className="font-bold text-[2rem] text-[#181940]">
            Hey, welcom back!
          </h1>
          <h3 className="text-[#747474]">
            No account ? <Link className="text-[#181940] cursor-pointer" to="/Register">Register here.</Link>
          </h3>
          <input
            type="text"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="relative h-12 overflow-hidden rounded bg-[#4749b9] px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
            <span className="relative">Log In</span>
          </button>

          <GoogleButton />
        </form>
      </section>

  );
}
