import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

import { Skeleton } from "@heroui/skeleton";
import { useUserStore } from "../../userStore";
import { useChatStore } from "../../userChatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { userDetails } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const [timestamps, setTimestamps] = useState({});

  useEffect(() => {
    if (!userDetails?.id) {
      console.warn("⚠ User not logged in, skipping chat fetch.");
      return;
    }

    console.log("🔍 Listening for chat updates for user:", userDetails.id);

    const fetchChats = (userId) => {
      try {
        console.log(`Listening for chat updates for user: ${userId}`);

        const userChatsRef = doc(db, "userChat", userId);

        const unsubscribe = onSnapshot(userChatsRef, async (userChatsDoc) => {
          if (userChatsDoc.exists()) {
            const chatIdsData = userChatsDoc.data();
            console.log("📡 chatIdsData:", chatIdsData);

            const chatIds = Object.entries(chatIdsData.chats || {});
            console.log("📡 Fetched chatIds:", chatIds);

            const chats = await Promise.all(
              chatIds.map(async ([chatId, chatData]) => {
                if (
                  chatData &&
                  chatData.updatedAt &&
                  chatData.lastMessage !== undefined
                ) {
                  const chatDocRef = doc(db, "Chats", chatId);
                  const chatDoc = await getDoc(chatDocRef);
                  if (chatDoc.exists()) {
                    const receiverId = chatData.receiverId || userId;
                    const receiverDocRef = doc(db, "users", receiverId);
                    const receiverDoc = await getDoc(receiverDocRef);
                    const receiverData = receiverDoc.exists()
                      ? receiverDoc.data()
                      : null;

                    return {
                      chatId,
                      ...chatDoc.data(),
                      lastMessage: chatData.lastMessage,
                      updatedAt: chatData.updatedAt,
                      user: receiverData,
                      isNewMessage: chatData.isNewMessage
                    };
                  }
                }
                return null;
              })
            );

            const filteredChats = chats.filter(Boolean);
            filteredChats.sort(
              (a, b) => b.updatedAt.seconds - a.updatedAt.seconds
            );
            setChats(filteredChats);
            console.log("✅ Chats sorted and set:", filteredChats);

            // Update timestamps
            const newTimestamps = {};
            filteredChats.forEach((chat) => {
              const chatUpdatedAt = new Date(chat.updatedAt.seconds * 1000);
              const now = new Date();
              const timeDiff = (now - chatUpdatedAt) / 1000;

              newTimestamps[chat.chatId] =
                timeDiff <= 100
                  ? "Just now"
                  : chatUpdatedAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    });

              if (timeDiff <= 10) {
                setTimeout(() => {
                  setTimestamps((prev) => ({
                    ...prev,
                    [chat.chatId]: chatUpdatedAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    })
                  }));
                }, 10000);
              }
            });
            setTimestamps(newTimestamps);
          } else {
            console.log("No chats found for user.");
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats(userDetails.id);
  }, [userDetails?.id]);

  return (
    <div className="w-full gap-5 flex flex-col overflow-auto scrollbar-none p-2">
      {chats.length === 0 ? (
        <>
          <div className="rounded-2xl border border-gray-200 w-full py-3 px-4 gap-4 flex items-center">
            <div>
              <Skeleton className="flex rounded-full bg-gray-500 w-12 h-12 animate-pulse" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 bg-gray-500 rounded-lg animate-pulse" />
              <Skeleton className="h-3 w-4/5 bg-gray-500 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 w-full py-3 px-4 gap-4 flex items-center">
            <div>
              <Skeleton className="flex rounded-full bg-gray-500 w-12 h-12 animate-pulse" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 bg-gray-500 rounded-lg animate-pulse" />
              <Skeleton className="h-3 w-4/5 bg-gray-500 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 w-full py-3 px-4 gap-4 flex items-center">
            <div>
              <Skeleton className="flex rounded-full bg-gray-500 w-12 h-12 animate-pulse" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 bg-gray-500 rounded-lg animate-pulse" />
              <Skeleton className="h-3 w-4/5 bg-gray-500 rounded-lg animate-pulse" />
            </div>
          </div>

        </>
      ) : (
        chats?.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => changeChat(chat.chatId, chat.user)}
            className={`rounded-2xl flex border border-gray-200 w-full py-3 px-4 gap-4 cursor-pointer
              ${chatId === chat.chatId ? "bg-gray-200" : "hover:bg-gray-100"} 
              ${chat.isNewMessage ? "bg-blue-200" : "bg-gray-200"}`} // Highlight new messages
          >
            <img
              className="rounded-full w-12 h-12 object-cover"
              src={chat.user?.photo || "profilepi.jpg"}
              alt="Profile"
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">
                  {chat.user?.Firstname || "Unknown"}{" "}
                  {chat.user?.Lastname || "Unknown"}
                </h1>
                <span className="text-sm text-gray-500">
                  {timestamps[chat.chatId] || ""}
                </span>
              </div>
              <p className="text-gray-600 text-sm truncate">
                {chat.lastMessage}
                <span className="text-blue-500">
                  {" "}
                  {chat.isNewMessage ? "New" : ""}
                </span>{" "}
                {/* New message indicator */}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatList;
