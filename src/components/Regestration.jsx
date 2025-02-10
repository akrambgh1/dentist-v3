import { useState } from "react";
import Stepper from "./Stepper";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const RegisterForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
    <section className="w-full h-screen flex items-center justify-center relative">
    <div className="w-[70%] h-[80dvh] bg-white p-6 rounded-lg shadow-md flex gap-[1rem]">

        <div className="w-[30%] bg-[#181940] h-full rounded-[20px]">
            <Stepper step={step} setStep={setStep} />
        </div>
      
        <div className="w-[60%] p-4">
            {step === 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Account Info</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none mb-2"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none mb-2"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none mb-2"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none mb-2"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Confirm Details</h2>
          <p>Email: {formData.email}</p>
          <p>Name: {formData.name}</p>
          <p>Age: {formData.age}</p>
        </div>
      )}

      <div className="flex justify-between mt-4">
        {step > 0 && (
          <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        {step < 2 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        ) : (
          <button className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
        )}
        </div>
      
     </div>
      
      
    </div>
    </section>

    <Link to="/">
        <div className="absolute bottom-[3rem] left-[3rem] text-white bg-[#181940] rounded-full p-4 max-md:hidden">
          <HomeIcon size={24} className="text-white" />
        </div>
      </Link>
    </>
  );
};

export default RegisterForm;
