import { onSnapshot, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { useChatStore } from "../../userChatStore";
import { useUserStore } from "../../userStore";

function Chat() {
    const { chatId, changeChat } = useChatStore();
    const { userDetails } = useUserStore();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [recipient, setRecipient] = useState(null);
    const [isReceiverUserBlocked, setIsReceiverUserBlocked] = useState(false);
    const [isCurrentUserBlocked, setIsCurrentUserBlocked] = useState(false);
    const [isTyping, setIsTyping] = useState(null);

    const messageEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const [isAtBottom, setIsAtBottom] = useState(true); // To track if user is at bottom

    if (!userDetails) return <p>Please log in to continue.</p>;

    useEffect(() => {
        if (!chatId || !userDetails) return;

        const chatRef = doc(db, "Chats", chatId);
        const unSubChat = onSnapshot(chatRef, async (docSnap) => {
            if (docSnap.exists()) {
                const chatData = docSnap.data();
                setMessages(chatData.messages || []);

                const recipientId = chatData.users.find(id => id !== userDetails.id);
                if (recipientId) {
                    const recipientRef = doc(db, "users", recipientId);
                    const recipientSnap = await getDoc(recipientRef);
                    if (recipientSnap.exists()) {
                        setRecipient(recipientSnap.data());
                    }
                }

                // Reset `isNewMessage` when user opens the chat
                const userChatRef = doc(db, "userChat", userDetails.id);
                await updateDoc(userChatRef, {
                    [`chats.${chatId}.isNewMessage`]: false
                });
            }
        });

        return () => unSubChat();
    }, [chatId, userDetails]);

    useEffect(() => {
        // Scroll to bottom only if user is at the bottom
        if (isAtBottom && messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isAtBottom]);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const isAtBottom = chatContainerRef.current.scrollHeight === chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight;
            setIsAtBottom(isAtBottom);
        }
    };

    const formatMessageTime = (timestamp, prevTimestamp) => {
        if (!timestamp) return "Just now";

        const messageDate = new Date(timestamp.seconds * 1000);
        const prevMessageDate = prevTimestamp ? new Date(prevTimestamp.seconds * 1000) : null;
        const now = new Date();
        const options = { hour: "2-digit", minute: "2-digit" };

        if (prevMessageDate && (messageDate - prevMessageDate) < 5 * 60 * 1000) {
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
            return `${messageDate.toLocaleDateString("en-GB", { weekday: "long" })}, ${messageDate.toLocaleTimeString("en-GB", options)}`;
        }

        return messageDate.toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
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
            timestamp: new Date(),
        };
    
        await updateDoc(chatRef, {
            messages: arrayUnion(newMessage),
            updatedAt: new Date()
        });
    
        const chatSnap = await getDoc(chatRef);
        const recipientId = chatSnap.exists() ? chatSnap.data().users.find(id => id !== userDetails.id) : null;
    
        const userChatsenderRef = doc(db, "userChat", userDetails.id);
        const recipientUserChatRef = recipientId ? doc(db, "userChat", recipientId) : null;
    
        const updateSender = {
            [`chats.${chatId}.lastMessage`]: messageText,
            [`chats.${chatId}.updatedAt`]: new Date(),
        };
    
        const updateRecipient = {
            ...updateSender,
            [`chats.${chatId}.isNewMessage`]: true, // Mark as unread for recipient
        };
    
        await updateDoc(userChatsenderRef, updateSender);
        if (recipientUserChatRef) {
            await updateDoc(recipientUserChatRef, updateRecipient);
        }
    
        setMessageText("");
    };
    

    const handleTyping = async () => {
        if (isCurrentUserBlocked || isReceiverUserBlocked) return;

        const chatRef = doc(db, "Chats", chatId);
        await updateDoc(chatRef, { typing: userDetails.id });

        setTimeout(async () => {
            await updateDoc(chatRef, { typing: null });
        }, 2000);
    };

    const blockUser = async () => {
        await updateDoc(doc(db, "users", userDetails.id), {
            blocked: arrayUnion(recipient.id),
        });

        await updateDoc(doc(db, "users", recipient.id), {
            blocked: arrayUnion(userDetails.id),
        });

        changeChat(chatId, null);
        alert("You have blocked this user.");
    };

    const unblockUser = async () => {
        await updateDoc(doc(db, "users", userDetails.id), {
            blocked: arrayRemove(recipient.id),
        });

        await updateDoc(doc(db, "users", recipient.id), {
            blocked: arrayRemove(userDetails.id),
        });

        changeChat(chatId, null);
        alert("You have unblocked this user.");
    };

    return (
        <div className="w-2/3 h-screen flex flex-col">
            <div className="p-4 flex items-center border-b bg-gray-100">
                {isReceiverUserBlocked || isCurrentUserBlocked ? (
                    <div className="flex items-center">
                        <p className="text-red-500 font-semibold">This account is blocked</p>
                    </div>
                ) : recipient ? (
                    <>
                        <img
                            src={recipient.photo || "/profilepi.jpg"}
                            className="w-10 h-10 rounded-full mr-3"
                            alt="Profile"
                        />
                        <h1 className="text-lg font-semibold">{recipient.Firstname || "Unknown"}</h1>
                    </>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>

            <div
                className="h-[80%] overflow-y-scroll p-4 flex flex-col scroll-smooth"
                ref={chatContainerRef}
                onScroll={handleScroll}
            >
                {isReceiverUserBlocked || isCurrentUserBlocked ? (
                    <div className="p-4 text-center">
                        <p className="text-gray-500">
                            You can't send or receive messages because this account is blocked.
                        </p>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isMe = msg.senderId === userDetails.id;
                        const prevMessage = messages[index - 1];
                        const messageTime = formatMessageTime(msg.timestamp, prevMessage?.timestamp);

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${
                                    isMe ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`p-3 pe-4 pl-4 flex m-2 rounded-4xl max-w-xs ${
                                        isMe
                                            ? "bg-blue-500 text-white self-end"
                                            : "bg-gray-200 text-black self-start"
                                    }`}
                                >
                                    <p>{msg.text}</p>
                                </div>
                                {messageTime && <p className="text-xs text-black mt-1">{messageTime}</p>}
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

            <div className="p-4 border-t bg-white flex items-center">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
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
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
                    onClick={sendMessage}
                    disabled={isCurrentUserBlocked || isReceiverUserBlocked}
                >
                    Send
                </button>
                {isReceiverUserBlocked || isCurrentUserBlocked ? (
                    <button
                        className="ml-2 p-2 bg-red-500 text-white rounded-lg"
                        onClick={unblockUser}
                    >
                        Unblock Account
                    </button>
                ) : (
                    <button
                        className="ml-2 p-2 bg-red-500 text-white rounded-lg"
                        onClick={blockUser}
                    >
                        Block Account
                    </button>
                )}
            </div>
        </div>
    );
}

export default Chat;
