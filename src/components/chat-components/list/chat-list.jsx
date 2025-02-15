import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot ,getDoc} from "firebase/firestore";

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

    const fetchChats = (userId) => {
      try {
        console.log(`Listening for chat updates for user: ${userId}`);
        
        // Listen for real-time updates of the user's chats
        const userChatsRef = doc(db, "userChat", userId);

        const unsubscribe = onSnapshot(userChatsRef, async (userChatsDoc) => {
          if (userChatsDoc.exists()) {
            const chatIdsData = userChatsDoc.data(); // This is the object with chatIds
            console.log("📡 chatIdsData:", chatIdsData); // Log the entire object

            const chatIds = Object.entries(chatIdsData.chats || {}); // Access the nested 'chats' object
            console.log("📡 Fetched chatIds:", chatIds);

            // Process each chatId
            const chats = await Promise.all(
              chatIds.map(async ([chatId, chatData]) => {
                if (chatData && chatData.updatedAt && chatData.lastMessage !== undefined) {
                  const chatDocRef = doc(db, "Chats", chatId);
                  const chatDoc = await getDoc(chatDocRef);
                  if (chatDoc.exists()) {
                    const receiverId = chatData.receiverId || userId; // Default to userId if receiverId is missing
                    const receiverDocRef = doc(db, "users", receiverId);
                    const receiverDoc = await getDoc(receiverDocRef);
                    const receiverData = receiverDoc.exists() ? receiverDoc.data() : null;

                    return {
                      chatId,
                      ...chatDoc.data(),
                      lastMessage: chatData.lastMessage,
                      updatedAt: chatData.updatedAt,
                      user: receiverData,
                    };
                  }
                }
                return null;
              })
            );

            // Filter out any undefined or null results from the Promise.all
            const filteredChats = chats.filter(Boolean);

            console.log("📡 Chats data:", filteredChats);

            // Sort chats and set state
            filteredChats.sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds);
            setChats(filteredChats);
            console.log("✅ Chats sorted and set:", filteredChats);
          } else {
            console.log("No chats found for user.");
          }
        });

        // Cleanup on component unmount
        return () => {
          unsubscribe(); // Unsubscribe when the component unmounts
        };

      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    // Call fetchChats to listen for real-time updates
    fetchChats(userDetails.id);
  }, [userDetails?.id]);

  return (
    <div className="w-full gap-5 flex flex-col overflow-y-scroll p-2">
      {chats.length === 0 ? (
        <p className="text-gray-500 text-center">No chats available</p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => changeChat(chat.chatId, chat.user)}
            className={`rounded-2xl flex border border-gray-200 w-full py-3 px-4 gap-4 cursor-pointer 
            ${chatId === chat.chatId ? "bg-gray-200" : "hover:bg-gray-100"}`}
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
                  {chat.updatedAt
                    ? new Date(chat.updatedAt.seconds).toLocaleTimeString()
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
