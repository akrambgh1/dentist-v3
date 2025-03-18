import { useUserStore } from "../../userStore";

const UserInfo = () => {
  const { userDetails } = useUserStore();

  return (
    <section className="flex items-center  w-full gap-[3rem]">
      <div className="pl-2 flex flex-1 items-center justify-between w-full gap-2">
        <div className="bg-[#18717b] px-4 py-1 rounded-[20px]">
          <h1 className="font-[400] text-white">Hello, {userDetails?.Firstname}</h1>
        </div>
        
        <div className="rounded-[] w-12">
          <img
            className="rounded-[50%] w-10 h-10"
            src={userDetails?.photo || "profilepi.jpg"}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
