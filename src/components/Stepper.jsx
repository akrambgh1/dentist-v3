const Stepper = ({ step }) => {
     const steps = ["Account", "Details"]; //"Confirm"
  
    return (
      <div className="relative flex items-center justify-center w-full mb-6">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-[#f8f8f8] rounded-[10px] -translate-y-1/2">
          <div
            className="h-2 bg-[#4749b9] transition-all duration-300 rounded-[10px]"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
  
      </div>
    );
  };
  
  export default Stepper;
  