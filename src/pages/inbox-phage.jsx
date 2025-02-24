/* eslint-disable no-unused-vars */
import Sidebar from "../components/Sidebar";
import List from "../components/chat-components/list/list";
import Chat from "../components/chat-components/chat/chat";
import { useChatStore } from "../components/userChatStore";
import Detail from "../components/chat-components/detail";
import Nav from "../components/navbar";
import { useEffect , useState } from "react";
import { useUserStore } from "../components/userStore";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Inbox() {
  const { chatId } = useChatStore();
  const { fetchUsersInfo } = useUserStore();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);


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
      {isNavbarVisible && <Nav />}
      <section className="flex">
        <div className="w-auto">
          <Sidebar></Sidebar>
        </div>
        <div className="flex w-full gap-[1rem]">
          <List />
          {chatId && (
            <>
              <Chat setIsNavbarVisible={setIsNavbarVisible}/>
              
            </>
          )}
          {/*
           {detail && (
            <>
             
              <Detail />
            </>
          )}*/}
        </div>
      </section>
    </>
  );
}
