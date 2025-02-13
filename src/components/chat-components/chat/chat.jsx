// eslint-disable-next-line no-unused-vars
import Messages from "./messages";
import UserInfos from "./userInfos";

function Chat() {
  return (
    <>
      <div className="flex-1  h-full  pt-10 border-r border-[#e0e0e0] flex flex-col gap-5 items-start p-4 pt-10">
        <UserInfos />

       
        
        
          <Messages />
        
        <div>
          <div className="flex items-center w-full gap-[1rem]">
            <input
              type="text"
              className="border-2 border-solid border-[#ccc] rounded-md px-4 py-2"
              placeholder="Type a message"
            />
            <button className="bg-[#4caf50] text-[#fff] rounded-md px-4 py-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
