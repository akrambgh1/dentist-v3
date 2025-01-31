import Login from "./Login-page";
import Register from "./register-page";
import { useState } from "react";

const Button = () => {
  const [activeOption, setActiveOption] = useState('option1'); // Default to Option 1

  return (
    <div>
      <div className="relative flex items-center h-12 w-96 border-2 border-black rounded-full overflow-hidden mb-6">
        <input
          id="option1"
          name="options"
          type="radio"
          className="hidden"
          checked={activeOption === 'option1'}
          onChange={() => setActiveOption('option1')}
        />
        <label
          htmlFor="option1"
          className={`flex-1 text-center cursor-pointer transition-all duration-500 font-medium text-lg ${
            activeOption === 'option1' ? 'text-white' : 'text-black'
          } z-10`} // Added z-10 for text above span
        >
          Option 1
        </label>

        <input
          id="option2"
          name="options"
          type="radio"
          className="hidden"
          checked={activeOption === 'option2'}
          onChange={() => setActiveOption('option2')}
        />
        <label
          htmlFor="option2"
          className={`flex-1 text-center cursor-pointer transition-all duration-500 font-medium z-10 text-lg ${
            activeOption === 'option2' ? 'text-white' : 'text-black'
          }`}
        >
          Option 2
        </label>

        <span
          className={`absolute top-1 left-1 w-1/2 h-9 bg-black rounded-full transition-all z-0 duration-500 ${
            activeOption === 'option2' ? 'left-1/2' : 'left-1'
          }`}
        ></span>
      </div>

      <div className="content">
        {activeOption === 'option1' ? (
          <Login />
        ) : activeOption === 'option2' ? (
          <Register />
        ) : null}
      </div>
    </div>
  );
};

export default Button;
