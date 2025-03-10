/* eslint-disable react/prop-types */
const Stepper = ({ step }) => {
  const steps = ["Account", "Details", "Confirm"];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {steps.map((label, index) => (
        <div key={index} className="flex items-start relative">
          {/* Step Indicator /}
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center w-fit">
              <div
                className={w-10 h-10 flex items-center justify-center rounded-full font-semibold
                  ${
                    step >= index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }}
              >
                {index + 1}
              </div>

              <div className="">
                <p
                  className={text-lg font-semibold ${
                    step >= index ? "text-blue-500" : "text-gray-500"
                  }}
                >
                  {label}
                </p>
              </div>
            </div>

            {/ Progress Line /}
            {index < steps.length - 1 && (
              <div className="w-1 h-[10rem] bg-gray-300 relative">
                <div
                  className={absolute left-0 top-0 w-1 transition-all duration-300 
                      ${
                        step > index ? "h-full bg-blue-500" : "h-0 bg-blue-500"
                      }}
                />
              </div>
            )}
          </div>

          {/ Step Labels */}
        </div>
      ))}
    </div>
  );
};

export default Stepper;