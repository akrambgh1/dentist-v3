/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { onSnapshot, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { useChatStore } from "../../userChatStore";
import { useUserStore } from "../../userStore";

function Chat() {
    const { chatId } = useChatStore();
    const { userDetails } = useUserStore();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [recipient, setRecipient] = useState(null);
    const [isTyping, setIsTyping] = useState(null);
    
    const messagesContainerRef = useRef(null);
    const isUserAtBottomRef = useRef(true);

    if (!userDetails) return <p>Please log in to continue.</p>;

    useEffect(() => {
        if (!chatId) return;

        isUserAtBottomRef.current = true;
        setMessages([]);

        const chatRef = doc(db, "Chats", chatId);
        const unSub = onSnapshot(chatRef, async (docSnap) => {
            if (docSnap.exists()) {
                const chatData = docSnap.data();
                const newMessages = chatData.messages || [];

                setMessages(() => {
                    if (isUserAtBottomRef.current) {
                        setTimeout(scrollToBottom, 100);
                    }
                    return newMessages;
                });

                const recipientId = chatData.users.find(id => id !== userDetails.id);
                if (recipientId) {
                    const recipientRef = doc(db, "users", recipientId);
                    const recipientSnap = await getDoc(recipientRef);
                    if (recipientSnap.exists()) {
                        setRecipient(recipientSnap.data());
                    }
                }

                setIsTyping(chatData.typing === recipientId ? recipientId : null);
            }
        });

        return () => unSub();
    }, [chatId]);

    const isUserAtBottom = () => {
        if (!messagesContainerRef.current) return false;
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
        return scrollHeight - scrollTop - clientHeight < 10;
    };

    const scrollToBottom = () => {
        messagesContainerRef.current?.scrollTo({ top: messagesContainerRef.current.scrollHeight, behavior: "smooth" });
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

        setMessageText("");
        setTimeout(scrollToBottom, 100);
    };

    const handleTyping = async () => {
        const chatRef = doc(db, "Chats", chatId);
        await updateDoc(chatRef, { typing: userDetails.id });
        setTimeout(async () => {
            await updateDoc(chatRef, { typing: null });
        }, 2000);
    };

    return (
        <div className="w-2/3 h-screen flex flex-col">
            <div className="p-4 flex items-center border-b bg-gray-100">
                {recipient ? (
                    <>
                        <img src={recipient.photo || "/profilepi.jpg"} className="w-10 h-10 rounded-full mr-3" alt="Profile" />
                        <h1 className="text-lg font-semibold">{recipient.Firstname || "Unknown"}</h1>
                    </>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>

            <div
                ref={messagesContainerRef}
                className="h-[80%] overflow-y-scroll p-4 flex flex-col"
                onScroll={() => (isUserAtBottomRef.current = isUserAtBottom())}
            >
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === userDetails.id;
                    const prevMessage = messages[index - 1];
                    const messageTime = formatMessageTime(msg.timestamp, prevMessage?.timestamp);

                    return (
                        <div key={index} className={`flex flex-col items-center ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 pe-4 pl-4 flex m-2 rounded-4xl max-w-xs ${isMe ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
                                <p>{msg.text}</p>
                            </div>
                            {messageTime && <p className="text-xs text-black mt-1">{messageTime}</p>}
                        </div>
                    );
                })}
            </div>

            {isTyping && (
                <p className="text-gray-500 text-sm px-4">{recipient?.Firstname || "User"} is typing ......</p>
            )}

            <div className="p-4 border-t bg-white flex items-center">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => { setMessageText(e.target.value); handleTyping(); }}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
