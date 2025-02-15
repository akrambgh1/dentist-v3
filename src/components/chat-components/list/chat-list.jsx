import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { 
  collection, doc, getDoc, query, orderBy, limit, onSnapshot, getDocs 
} from "firebase/firestore";

import { useUserStore } from "../../userStore";
import { useChatStore } from "../../userChatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { userDetails } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (!userDetails?.id) {
      console.warn("⚠ User not logged in, skipping chat fetch.");
      return;
    }

    console.log("🔍 Listening for chat updates for user:", userDetails.id);

    const chatsRef = collection(db, "Chats");

    // Listen for real-time updates
    const unsubscribe = onSnapshot(chatsRef, async (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const chatList = await Promise.all(
        chatArray.map(async (chat) => {
          if (!chat.users || chat.users.length !== 2) return null;

          // Exclude self-chats
          const receiverId = chat.users.find(uid => uid !== userDetails.id);
          if (!receiverId) return null;

          // Fetch receiver user details
          const userDoc = await getDoc(doc(db, "users", receiverId));
          const userData = userDoc.exists() ? userDoc.data() : null;

          // Fetch latest message
          const messagesRef = collection(db, "Chats", chat.id, "messages");
          const latestMessageQuery = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
          const latestMessageSnap = await getDocs(latestMessageQuery);

          let lastMessage = "No messages yet";
          let lastMessageTimestamp = null;

          if (!latestMessageSnap.empty) {
            const latestMsgData = latestMessageSnap.docs[0].data();
            lastMessage = latestMsgData.text || "📎 Attachment";
            lastMessageTimestamp = latestMsgData.timestamp;
            if (latestMsgData.senderId === userDetails.id) {
              lastMessage = `You: ${lastMessage}`;
            }
          }

          return userData ? { ...chat, user: userData, lastMessage, lastMessageTimestamp } : null;
        })
      );

      const sortedChats = chatList.filter(Boolean).sort((a, b) => {
        return (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0);
      });

      setChats(sortedChats);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [userDetails?.id]);

  return (
    <div className="w-full gap-5 flex flex-col overflow-y-scroll p-2">
      {chats.length === 0 ? (
        <p className="text-gray-500 text-center">No chats available</p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => changeChat(chat.id, chat.user)}
            className={`rounded-2xl flex border border-gray-200 w-full py-3 px-4 gap-4 cursor-pointer 
            ${chatId === chat.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
          >
            <img
              className="rounded-full w-12 h-12 object-cover"
              src={chat.user?.photo || "/profilepi.jpg"}
              alt="Profile"
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">{chat.user?.Firstname || "Unknown"}</h1>
                <span className="text-sm text-gray-500">
                  {chat.lastMessageTimestamp
                    ? new Date(chat.lastMessageTimestamp.toDate()).toLocaleTimeString()
                    : ""}
                </span>
              </div>
              <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatList;
