import { onSnapshot, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useChatStore } from "../../userChatStore";
import { useUserStore } from "../../userStore";

function Chat() {
    const { chatId } = useChatStore();
    const { userDetails } = useUserStore();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [recipient, setRecipient] = useState(null);

    if (!userDetails) return <p>Please log in to continue.</p>;

    useEffect(() => {
        if (!chatId) return;

        const chatRef = doc(db, "Chats", chatId);
        const unSub = onSnapshot(chatRef, async (docSnap) => {
            if (docSnap.exists()) {
                const chatData = docSnap.data();
                setMessages(chatData.messages || []);

                // Get recipient ID (other user in the chat)
                const recipientId = chatData.users.find(id => id !== userDetails.id);
                if (recipientId) {
                    const recipientRef = doc(db, "users", recipientId);
                    const recipientSnap = await getDoc(recipientRef);
                    if (recipientSnap.exists()) {
                        setRecipient(recipientSnap.data()); // Store recipient details
                    }
                }
            }
        });

        return () => unSub();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (!messageText.trim() || !chatId || !userDetails?.id) return;

        const chatRef = doc(db, "Chats", chatId);
        const userChatSenderRef = doc(db, "userChat", userDetails.id);

        try {
            const newMessage = {
                senderId: userDetails.id,
                text: messageText,
                timestamp: new Date(),
            };

            await updateDoc(chatRef, {
                messages: arrayUnion(newMessage),
            });

            // Get recipient ID
            const chatSnap = await getDoc(chatRef);
            const recipientId = chatSnap.exists()
                ? chatSnap.data().users.find((id) => id !== userDetails.id)
                : null;

            // Update chat lists for both users
            const updates = {
                [`chats.${chatId}.lastMessage`]: messageText,
                [`chats.${chatId}.updatedAt`]: new Date(),
            };

            await updateDoc(userChatSenderRef, updates);
            if (recipientId) {
                await updateDoc(doc(db, "userChat", recipientId), updates);
            }

            setMessageText(""); // Clear input
            console.log("✅ Message sent:", newMessage);
        } catch (error) {
            console.error("🔥 Error sending message:", error);
        }
    };

    return (
        <div className="w-2/3 h-full flex flex-col">
            {/* Chat Header - Show Recipient Info */}
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

            {/* Messages List */}
            <div className="h-[80%] overflow-y-scroll p-4 flex flex-col space-y-2">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === userDetails.id;
                    const messageTime = msg.timestamp
                        ? new Date(msg.timestamp.seconds * 1000).toLocaleString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                          })
                        : "Just now";

                    return (
                        <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`p-3 rounded-lg max-w-xs ${
                                    isMe ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"
                                }`}
                            >
                                <p>{msg.text}</p>
                                <p className="text-xs text-gray-300 mt-1">{messageTime}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Message Input */}
            <div className="p-4 flex items-center">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <button onClick={handleSendMessage} className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg">
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
