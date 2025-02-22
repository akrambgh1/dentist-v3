// eslint-disable-next-line no-unused-vars
import ChatList from "./chat-list";
import UserInfo from "./userInfo";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, serverTimestamp, doc, setDoc,  getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useUserStore } from "../../userStore";

function List() {
  const [searchTerm, setSearchTerm] = useState("");
  const [istyping, setIstyping] = useState(false);
  const [users, setUsers] = useState([]);
  const { userDetails } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchTerm.trim()) {
        setUsers([]);
       
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("lowercasedName", ">=", searchTerm),
          where("lowercasedName", "<=", searchTerm + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };
    
    fetchUsers();
  }, [searchTerm]);

  const handleInputChange = async (e) => {
    setIstyping(true);
    setSearchTerm(e.target.value.toLowerCase());
    
   
    
  };

  const handleAddingUser = async (user) => {
    if (!user.id || !userDetails?.id) return;
    if (user.id === userDetails?.id) return;


    try {
      const chatRef = collection(db, "Chats");
      const userChatRef = collection(db, "userChat");

      const chatId = userDetails.id > user.id
        ? `${userDetails.id}_${user.id}`
        : `${user.id}_${userDetails.id}`;

      const chatDocRef = doc(chatRef, chatId);
      const chatSnap = await getDoc(chatDocRef);

      if (!chatSnap.exists()) {
        await setDoc(chatDocRef, {
          createdAt: serverTimestamp(),
          messages: [],
          users: [userDetails.id, user.id],
         
        });
      }

      const userChatSenderRef = doc(userChatRef, userDetails.id);
      const userChatReceiverRef = doc(userChatRef, user.id);

      await setDoc(
        userChatSenderRef,
        {
          chats: {
            [chatId]: {
              lastMessage: "",
              receiverId: user.id,
              updatedAt: serverTimestamp(),
              isTyping: false,
              isNewMessage: false,
            },
          },
        },
        { merge: true }
      );

      await setDoc(
        userChatReceiverRef,
        {
          chats: {
            [chatId]: {
              lastMessage: "",
              receiverId: userDetails.id,
              updatedAt: serverTimestamp(),
              isTyping: false,
              isNewMessage: false,
              
            },
          },
        },
        { merge: true }
      );

      console.log("✅ New chat added:", chatId);
    } catch (error) {
      console.error("🔥 Error adding user to chat:", error);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col gap-5 items-start p-4 pt-15 w-[40%] border-r border-r-[#f7f7f7] max-md:w-full">
        <UserInfo />

        <div className={`flex flex-col border-[#eee] border-[1px] w-[100%] py-2 pl-[.5rem] pr-[1rem] rounded-[15px] ${istyping ? "" : "h-11"}`}>
          <div className={`flex items-center gap-2 pb-2  ${istyping ? "border-b border-b-[#eee]" : ""}`}>
            <Search />
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="search"
              className="outline-none w-full"
            />
          </div>
          <div className="flex flex-col ">
            {istyping && (
              users.length > 0 ? (
                users.map((user) => (
                  <div className="flex items-center gap-1.5 justify-between mt-4" key={user.id}>
                    <div className="flex items-center gap-1.5">
                      <img
                      src={user.photo || "profilepi.jpg"}
                      alt={user.Firstname}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h1 className="text-[1.25rem] font-[600]">{user.Firstname}</h1>
                    </div>
                    
                    <div>
                      <button onClick={() => handleAddingUser(user)} className="p-1 bg-blue-950 rounded text-white">
                        add user
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`mt-2 pl-2 ${istyping ? "" : ""}`}>No users found</p>
              )
            )}
          </div>
        </div>
        <ChatList />
      </div>
    </>
  );
}

export default List;