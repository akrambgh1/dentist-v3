
import { EllipsisVertical,Phone } from 'lucide-react';
const UserInfos = () => {
  return (
    <div className="flex items-center  w-full gap-4 p-2">
      <div className="flex flex-1 items-center justify-start w-full gap-2">
        <div className="w-12">
          <img className="rounded-[50%]" src="/vite.svg" alt="" />
        </div>
        <div>
          <h1>Chat with akram</h1>
          <p className="text-[#88898b]">+212 6 555 555 55</p>
        </div>
      </div>
      <Phone />

      <EllipsisVertical />
    </div>
  );
};

export default UserInfos;
