/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

import { LockKeyhole } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import { ArrowLeft } from "lucide-react";

import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { useChatStore } from "../../userChatStore";
import { useUserStore } from "../../userStore";
import { SendHorizontal  } from 'lucide-react';

function Chat() {
  const { chatId, updateBlockStatus, changeChat } = useChatStore();
  const { userDetails } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [recipient, setRecipient] = useState(null);
  const { isReceiverUserBlocked } = useChatStore();
  const { isCurrentUserBlocked } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);

  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [isAtBottom, setIsAtBottom] = useState(true); // To track if user is at bottom

  if (!userDetails) return <p>Please log in to continue.</p>;

  useEffect(() => {
    if (!chatId || !userDetails) return;

    const chatRef = doc(db, "Chats", chatId);
    const userChatRef = doc(db, "userChat", userDetails.id);

    // Listener for chat messages and recipient
    const unSubChat = onSnapshot(chatRef, async (docSnap) => {
      if (docSnap.exists()) {
        const chatData = docSnap.data();
        setMessages(chatData.messages || []);

        const recipientId = chatData.users.find((id) => id !== userDetails.id);
        if (recipientId) {
          const recipientRef = doc(db, "users", recipientId);
          const recipientSnap = await getDoc(recipientRef);
          if (recipientSnap.exists()) {
            setRecipient(recipientSnap.data());
          }
        }

        // Reset `isNewMessage` when user opens the chat
        await updateDoc(userChatRef, {
          [`chats.${chatId}.isNewMessage`]: false
        });
      }
    });

    // Real-time listener for `isTyping`
    const unSubTyping = onSnapshot(userChatRef, (userChatSnap) => {
      if (userChatSnap.exists()) {
        const isTyping = userChatSnap.data().chats?.[chatId]?.isTyping;
        setIsTyping(isTyping);
      }
    });

    return () => {
      unSubChat();
      unSubTyping();
    };
  }, [chatId, userDetails]);

  useEffect(() => {
    // Scroll to bottom only if user is at the bottom
    if (isAtBottom && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const isAtBottom =
        chatContainerRef.current.scrollHeight ===
        chatContainerRef.current.scrollTop +
          chatContainerRef.current.clientHeight;
      setIsAtBottom(isAtBottom);
    }
  };
  const handleCloseChat = () => {
    console.log("Before closing:", { chatId });
    changeChat(null);
    setTimeout(() => {
      console.log("After closing:", useChatStore.getState()); // Check if state updates
    }, 10);
  };
  const formatMessageTime = (timestamp, prevTimestamp) => {
    if (!timestamp) return "Just now";

    const messageDate = new Date(timestamp.seconds * 1000);
    const prevMessageDate = prevTimestamp
      ? new Date(prevTimestamp.seconds * 1000)
      : null;
    const now = new Date();
    const options = { hour: "2-digit", minute: "2-digit" };

    if (prevMessageDate && messageDate - prevMessageDate < 5 * 60 * 1000) {
      return ""; // Hide timestamp if within 5 minutes
    }

    if (
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear()
    ) {
      return messageDate.toLocaleTimeString("en-GB", options);
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday, ${messageDate.toLocaleTimeString("en-GB", options)}`;
    }

    if (messageDate.getFullYear() === now.getFullYear()) {
      return `${messageDate.toLocaleDateString("en-GB", {
        weekday: "long"
      })}, ${messageDate.toLocaleTimeString("en-GB", options)}`;
    }

    return messageDate.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    if (isCurrentUserBlocked || isReceiverUserBlocked) {
      alert("You or the recipient is blocked, cannot send a message.");
      return;
    }

    const chatRef = doc(db, "Chats", chatId);
    const newMessage = {
      senderId: userDetails.id,
      text: messageText,
      timestamp: new Date()
    };

    await updateDoc(chatRef, {
      messages: arrayUnion(newMessage),
      updatedAt: new Date()
    });

    const chatSnap = await getDoc(chatRef);
    const recipientId = chatSnap.exists()
      ? chatSnap.data().users.find((id) => id !== userDetails.id)
      : null;

    const userChatsenderRef = doc(db, "userChat", userDetails.id);
    const recipientUserChatRef = recipientId
      ? doc(db, "userChat", recipientId)
      : null;

    const updateSender = {
      [`chats.${chatId}.lastMessage`]: messageText,
      [`chats.${chatId}.updatedAt`]: new Date()
    };

    const updateRecipient = {
      ...updateSender,
      [`chats.${chatId}.isNewMessage`]: true // Mark as unread for recipient
    };

    await updateDoc(userChatsenderRef, updateSender);
    if (recipientUserChatRef) {
      await updateDoc(recipientUserChatRef, updateRecipient);
    }

    setMessageText("");
  };

  const typingTimerRef = useRef(null);

  const handleTyping = async () => {
    if (isCurrentUserBlocked || isReceiverUserBlocked || !recipient) return;

    const userChatRef = doc(db, "userChat", recipient.id);

    // Set isTyping to true only if it was false before
    if (!isTyping) {
      await updateDoc(userChatRef, {
        [`chats.${chatId}.isTyping`]: true
      });
    }

    // Clear previous timer
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    // Set a new timer to turn isTyping off after 1 second
    typingTimerRef.current = setTimeout(async () => {
      setIsTyping(false);
      await updateDoc(userChatRef, {
        [`chats.${chatId}.isTyping`]: false
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  // Pass true or false dynamically

  const blockUser = async () => {
    await updateDoc(doc(db, "users", userDetails.id), {
      blocked: arrayUnion(recipient.id)
    });
    console.log("blockUser");
    await updateDoc(doc(db, "users", recipient.id), {
      blocked: arrayUnion(userDetails.id)
    });

    updateBlockStatus(recipient.id);
  };

  const unblockUser = async () => {
    await updateDoc(doc(db, "users", userDetails.id), {
      blocked: arrayRemove(recipient.id)
    });

    await updateDoc(doc(db, "users", recipient.id), {
      blocked: arrayRemove(userDetails.id)
    });

    updateBlockStatus(recipient.id);
  };



  return (
    <div className="w-2/3 h-screen flex flex-col max-md:absolute max-md:top-0 max-md:right-0 transition-all max-md:w-full max-md:bg-white ease duration-400">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          <ArrowLeft onClick={() => handleCloseChat()}>Close Chat</ArrowLeft>
          {isReceiverUserBlocked || isCurrentUserBlocked ? (
            <div className="flex items-center">
              <p className="text-red-500 font-semibold">
                This account is blocked
              </p>
            </div>
          ) : recipient ? (
            <>
              <div className="flex items-center justify-center">
                <img
                  src={recipient.photo || "/profilepi.jpg"}
                  className="w-10 h-10 rounded-full mr-3"
                  alt="Profile"
                />
                <h1 className="text-lg font-semibold">
                  {recipient.Firstname || "Unknown"}
                </h1>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        {isReceiverUserBlocked || isCurrentUserBlocked ? (
          <div className="bg-[#181940] p-2 flex items-center justify-center rounded-lg cursor-pointer">
            <LockKeyholeOpen className="text-white" onClick={unblockUser}>
              Unblock Account
            </LockKeyholeOpen>
          </div>
        ) : (
          <>
            <div className="bg-[#181940] p-2 flex items-center justify-center rounded-lg cursor-pointer">
              <LockKeyhole className="text-white " onClick={blockUser}>
                Block Account
              </LockKeyhole>
            </div>
          </>
        )}
      </div>

      <div
        className="h-[100%] w-full p-4 flex flex-col scroll-smooth border border-[#eee] rounded-[20px] overflow-auto scrollbar-none"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {isReceiverUserBlocked || isCurrentUserBlocked ? (
          <div className="p-4 text-center">
            <p className="text-gray-500">
              You can't send or receive messages because this account is
              blocked.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === userDetails.id;
            const prevMessage = messages[index - 1];
            const messageTime = formatMessageTime(
              msg.timestamp,
              prevMessage?.timestamp
            );

            return (
              <div
                key={index}
                className={`flex flex-col w-full ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-5 py-2 m-2 rounded-2xl max-w-xs break-words whitespace-pre-wrap ${
                    isMe ? "bg-[#181940] text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
                {messageTime && (
                  <p className="text-xs text-center w-full text-gray-500 mt-1">
                    {messageTime}
                  </p>
                )}
              </div>
            );
          })
        )}

        <div ref={messageEndRef} />
      </div>

      {isTyping && (
        <p className="text-gray-500 text-sm px-4">
          {recipient?.Firstname || "User"} is typing ......
        </p>
      )}

      <div className="p-4 bg-white flex items-center">
        <input
          type="text"
          className="flex-1 p-2 outline-none"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);

            handleTyping();
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isCurrentUserBlocked || isReceiverUserBlocked}
        />
        <button
          className="ml-2 px-8 max-md:px-2 p-2 bg-[#181940] text-white rounded-lg"
          onClick={sendMessage}
          disabled={isCurrentUserBlocked || isReceiverUserBlocked}
        >
          <SendHorizontal ></SendHorizontal >
        </button>
      </div>
    </div>
  );
}

export default Chat;
