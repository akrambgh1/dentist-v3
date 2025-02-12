/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { db } from "../../firebase";
import { onSnapshot, doc,getDoc } from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../userStore";
const chatList = () => {
  const [chats, setChats] = useState([]);
  const { userDetails } = useUserStore();

  useEffect(() => {
    if (!userDetails?.id) return; // Ensure userDetails.id exists
  
    const unSub = onSnapshot(doc(db, "userChat", userDetails.id), async (res) => {
     
      const items = res.data().chats;
      const promises = items.map(async (item) => { 
        const userDocRef = await doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return {...item, user };
      });
      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt));
     
    });
  
    return () => {
      unSub();
    };
  }, [userDetails?.id]);

  return (
    <div className="w-full gap-5 flex flex-col items-center justify-center">
      {chats?.map((chat) =>(<>
      <div key={chat.chatId} className=" rounded-2xl flex border-[#eee] border-[1px] w-[100%] py-2 pl-[.5rem] pr-[1rem]  gap-[1rem]">
        <img className="rounded-[50%] w-12" src={chat.user.photo || "profilepi.jpg"} alt="" />
        <div className="rounded-[]  items-center w-full">
            <h1>{chat.user.Firstname }</h1>
            <h1>{chat.lastMessage}</h1>
        </div>
      </div></>
      ))}
      
    
    </div>
  );
};

export default chatList;
