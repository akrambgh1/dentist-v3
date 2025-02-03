import { createContext, useState, useEffect } from "react";
import { auth,db} from "components/firebase";
import { doc, getDoc } from "firebase/firestore";

// Create Context
export const UserContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User document does not exist");
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, loading }}>
      {children}
    </UserContext.Provider>
  );
};
