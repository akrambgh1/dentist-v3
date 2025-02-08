/* eslint-disable react/prop-types */
import Login from "./Login-page";
import Register from "./register-page";
import { useState } from "react";

const Button = () => {
  const [activeOption, setActiveOption] = useState("option1"); // Default to Option 1

  return (
    <div>
      <div className="relative flex items-center h-12 w-96 border-2 border-black rounded-full overflow-hidden mb-6">
        <input
          id="option1"
          name="options"
          type="radio"
          className="hidden"
          checked={activeOption === "option1"}
          onChange={() => setActiveOption("option1")}
        />
        <label
          htmlFor="option1"
          className={`flex-1 text-center cursor-pointer transition-all duration-500 font-medium text-lg ${
            activeOption === "option1" ? "text-white" : "text-black"
          } z-10`} // Added z-10 for text above span
        >
          Option 1
        </label>

        <input
          id="option2"
          name="options"
          type="radio"
          className="hidden"
          checked={activeOption === "option2"}
          onChange={() => setActiveOption("option2")}
        />
        <label
          htmlFor="option2"
          className={`flex-1 text-center cursor-pointer transition-all duration-500 font-medium z-10 text-lg ${
            activeOption === "option2" ? "text-white" : "text-black"
          }`}
        >
          Option 2
        </label>

        <span
          className={`absolute top-1 left-1 w-1/2 h-9 bg-black rounded-full transition-all z-0 duration-500 ${
            activeOption === "option2" ? "left-1/2" : "left-1"
          }`}
        ></span>
      </div>

      <div className="content">
        {activeOption === "option1" ? (
          <Login />
        ) : activeOption === "option2" ? (
          <Register />
        ) : null}
      </div>
    </div>
  );
};

export default Button;

export function Button2({text}) {
  return (
    <button className="group relative cursor-pointer inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-[#181940] py-1 pl-[2rem] pr-[4rem] font-medium text-white hover:text-[#181940]">
      <span className="z-10 pr-2">{text}</span>
      <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-[#ffffff] text-[#181940] transition-[width] group-hover:w-[calc(100%-8px)] ">
        <div className="mr-3.5 flex items-center justify-center">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#181940]"
          >
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );
}
