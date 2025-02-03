/* eslint-disable react/prop-types */

export default function Card({ icon: Icon, title, description }) {
  return (
    <div className="w-full py-8 px-4 rounded-[10px] flex flex-col items-center justify-center gap-[1rem] text-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      {Icon && <Icon className="text-[#4749b9]" />}
      <h1 className="text-[1.5rem] font-[600] text-[#181940]">{title}</h1>
      <p>{description}</p>
    </div>
  );
}
