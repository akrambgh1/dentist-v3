import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";

// Zustand Store for User Data
export const useUserStore = create((set) => ({
    userDetails: null,
    isLoading: true,

    // Fetch user data from Firestore
    fetchUsersInfo: async (uid) => {
        if (!uid) return set({ userDetails: null, isLoading: false });

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ userDetails: { uid, ...docSnap.data() }, isLoading: false });
            } else {
                console.log("User document not found.");
                set({ userDetails: null, isLoading: false });
            }
        } catch (err) {
            console.error("Error fetching user info:", err);
            set({ userDetails: null, isLoading: false });
        }
    },
}));

// Automatically update Zustand store when user logs in/out
onAuthStateChanged(auth, (user) => {
    if (user) {
        useUserStore.getState().fetchUsersInfo(user.uid);
    } else {
        useUserStore.setState({ userDetails: null, isLoading: false });
    }
});
