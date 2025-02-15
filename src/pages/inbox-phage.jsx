import Sidebar from "../components/Sidebar";
import List from "../components/chat-components/list/list";
import Chat from "../components/chat-components/chat/chat";
import { useChatStore } from "../components/userChatStore";
import Detail from "../components/chat-components/detail";
import Nav from "../components/navbar";
import { useEffect } from "react";
import { useUserStore } from "../components/userStore";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Inbox() {
  const { chatId } = useChatStore();


  const { fetchUsersInfo } = useUserStore();



useEffect(() => {
  const unSub = onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchUsersInfo(user.uid);
    } else {
      console.warn("User is not logged in.");
      fetchUsersInfo(null);
    }
  });

  return () => unSub();
}, [fetchUsersInfo]);
  return (
    <>
      <Nav />
      <section className="flex">
        <div className="w-auto">
          <Sidebar></Sidebar>
        </div>
        <div className="flex justify-center items-center w-full">
          <List />
          {chatId && (
            <>
              <Chat />
              <Detail />
            </>
          )}
        </div>
      </section>
    </>
  );
}
