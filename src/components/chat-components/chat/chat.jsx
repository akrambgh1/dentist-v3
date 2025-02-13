import Messages from "./messages";
import UserInfos from "./userInfos";

function Chat() {
  return (
    <>
      <section className="px-6 py-6 h-full w-[65%] flex flex-col gap-[1rem]">
        <UserInfos />
        <div className="h-full border-[1px] border-[#eee] rounded-[20px] flex flex-col gap-5 items-start p-4 pt-10 relative">
          <Messages />

          <div className="w-full px-4 absolute bottom-[1rem] left-0">
            <div className="flex items-center w-full gap-[1rem] bg-[#f5f5f5] py-2 px-4 rounded-[15px]">
              <input
                type="text"
                className="w-full border-none py-2 px-4 rounded-[10px] outline-none"
                placeholder="Type a message"
              />
              <button className="bg-[#181940] text-[#fff] rounded-md px-8 py-2 cursor-pointer">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Chat;
