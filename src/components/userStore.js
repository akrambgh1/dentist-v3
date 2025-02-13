
import { create } from 'zustand'
import { doc, getDoc } from "firebase/firestore";

import { db } from './firebase';
export const useUserStore = create((set) => ({
    userDetails: null,
    isLodding: true,
    fetchUsersInfo: async (uid) => {
        if (!uid) return set({ userDetails: null, isLodding: true });
        try {
            

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ userDetails: docSnap.data(), isLodding: false });
            } else {
                set({ userDetails: null, isLodding: true });
  
                console.log("No such document!");
            }
        } catch (err) {
            console.error('Error fetching user info', err)
            
            return set({ userDetails: null, isLodding: false });
        }
    },
}));

