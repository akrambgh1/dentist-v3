/* eslint-disable react/prop-types */
const Stepper = ({ step }) => {
  const steps = ["Account", "Details", "Confirm"];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-[1rem] p-8">

        <div>
           <h1 className="text-white text-[1.5rem] text-center font-[600]">Finish setting up your account</h1> 
        </div>

            
        <div className="flex flex-col items-center justify-center">

       
      {steps.map((label, index) => (
        <div key={index} className="flex items-start relative">
          {/* Step Indicator */}
          <div className="flex flex-col justify-start items-center">
            <div className="flex flex-col items-center justify-center w-fit m-1">
              <div
                className={`w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-full font-semibold
                  ${
                    step >= index
                      ? "bg-[#4749b9] text-[#ffffff]"
                      : "bg-gray-300 text-gray-600"
                  }`}
              >
                {index + 1}
              </div>

              <div className="">
                <p
                  className={`text-lg font-semibold ${
                    step >= index ? "text-[#fff]" : "text-gray-500"
                  }`}
                >
                  {label}
                </p>
              </div>
            </div>

            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div className="w-1 h-[8rem] bg-gray-300 relative">
                <div
                  className={`absolute left-0 top-0 w-1 transition-all duration-300 
                      ${
                        step > index ? "h-full bg-[#4749b9]" : "h-0 bg-[#4749b9]"
                      }`}
                />
              </div>
            )}
          </div>

          {/* Step Labels */}
        </div>
      ))}
       </div>
    </div>
  );
};

export default Stepper;
