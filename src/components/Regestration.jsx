import { useState } from "react";
import Stepper from "./Stepper";

const RegisterForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <section className="w-full h-screen p-4 flex items-center justify-center">
        <div className="w-[70%] h-full flex flex-col items-center justify-center gap-[3rem]">
          <h1 className="text-[3rem] font-[500]">
            Finish setting your account
          </h1>
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center justify-center">
            <Stepper step={step} setStep={setStep} />
          </div>
          <div className="p-8 w-full h-[40vh] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] relative rounded-[15px]">
            {step === 0 && (<>
                <h2 className="text-lg font-semibold mb-4">Account Info</h2>
              <div className="grid grid-cols-2 gap-8">
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-[#fff] px-4 py-2 rounded-[5px] outline-none border-[1px] border-[#dfdfdf]"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-[#fff] px-4 py-2 rounded-[5px] outline-none border-[1px] border-[#dfdfdf]"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-full bg-[#fff] px-4 py-2 rounded-[5px] outline-none border-[1px] border-[#dfdfdf]"
                  value={formData.password}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full bg-[#fff] px-4 py-2 rounded-[5px] outline-none border-[1px] border-[#dfdfdf]"
                  value={formData.password}
                  onChange={handleChange}
                />  
              </div>

              <div className="w-full mt-8 flex items-center justify-center">
              <input
                  type="text"
                  name="address"
                  placeholder="Languages spoken"
                  className="bg-[#fff] px-4 py-2 rounded-[5px] outline-none border-[1px] border-[#dfdfdf] w-[50%]"
                  value={formData.password}
                  onChange={handleChange}
                /> 
              </div>
              </>
            )}

            {step === 1 && (
                <>
                <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
              
              <div className="grid grid-cols-2 gap-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-[#fff] px-4 py-2 rounded-[5px] outline-none border-[1px] border-[#dfdfdf]"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="w-full bg-[#fff] px-4 py-2 rounded-[5px] outline-none border-[1px] border-[#dfdfdf]"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              </>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Confirm Details</h2>
                <p>Email: {formData.email}</p>
                <p>Name: {formData.name}</p>
                <p>Age: {formData.age}</p>
              </div>
            )}

            {step > 0 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 rounded absolute bottom-[1rem] left-[1rem]"
              >
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-[#4749b9] text-white rounded absolute bottom-[1rem] right-[1rem] "
              >
                Next
              </button>
            ) : (
              <button className="px-4 py-2 bg-green-500 text-white rounded absolute bottom-[1rem] right-[1rem]">
                Submit
              </button>
            )}
          </div></div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
