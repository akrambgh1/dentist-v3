// eslint-disable-next-line no-unused-vars
import ChatList from "./chat-list";
import UserInfo from "./userInfo";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, serverTimestamp,doc ,setDoc, updateDoc,arrayUnion} from "firebase/firestore";
import { db } from "../../firebase";

import { useContext } from "react";
import { UserContext } from "../../../UserContext";
function List() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [users, setUsers] = useState([]);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchTerm.trim()) {
        setUsers([]); // Clear users when search is empty
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
  console.log("users", users);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setIsTyping(e.target.value.length > 0); // Show text only when input is not empty
  };
  const handleAddingUser = async (user) => {
    const chatRef = collection(db, "Chats");
    const userChatRef = collection(db, "userChat");
   
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
        
      },{ merge: true }
      )
      await updateDoc(doc(userChatRef,user.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          LastMessage: "",
          receiverId: userDetails.id,
          updatedAt: Date.now(),
        }),
      })
      await updateDoc(doc(userChatRef,userDetails.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          LastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      })
    
  
    }
    catch (error) {

      console.log(error);
    };
  }
  return (
    <>
      <div className="flex-1  h-screen  pt-10 border-r border-[#e0e0e0] flex flex-col gap-5 items-start p-4 pt-15">
        <UserInfo />

        <div className={`flex flex-col  border-[#eee] border-[1px] w-[100%] py-2 pl-[.5rem] pr-[1rem] rounded-[15px] gap-[1rem] ${isTyping ? "gap-[1rem]" : "h-11"}`}>
          <div className={ `flex items-center gap-4`}>
            <Search />
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="search"
              className="outline-none w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            {isTyping && (<>
              {users.length > 0 ? (
                users.map((user) => <div className="flex items-center gap-1.5" key={user.id}>
                  <img 
                    src={user.photo}
                    alt={user.Firstname}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {user.Firstname}<div>
                <button onClick={() => handleAddingUser(user)} className="p-1 bg-blue-950 rounded text-white" >add user</button>
              </div></div>)
              ) : (<>
                <p>No users found</p></>)}
            </>)}
            
            
          </div>
        </div>
        <ChatList />
      </div>
    </>
  );
}
export default List;
