import { create } from "zustand";
import { useUserStore } from "./userStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverUserBlocked: false,

    changeChat: (chatId , user ) => {
        const userDetails = useUserStore.getState().userDetails;
        if (!userDetails) return;
        if (!chatId || !user) {
            set({
              chatId: null,
              user: null,
              isCurrentUserBlocked: false,
              isReceiverUserBlocked: false,
            });
            return;
          }
        const isCurrentUserBlocked = user.blocked.includes(userDetails.id);
        const isReceiverUserBlocked = userDetails.blocked.includes(user.id);

        set({
            
           
            chatId:chatId || null,
            user: isCurrentUserBlocked ? null : user || null, // Null if blocked by recipient
            isCurrentUserBlocked,
            isReceiverUserBlocked,
        });
    },

    updateBlockStatus: async (recipientId) => {
        const userDetails = useUserStore.getState().userDetails;

        if (!userDetails || !recipientId) return;

        // Fetch updated recipient data
        const recipientRef = doc(db, "users", recipientId);
        const recipientSnap = await getDoc(recipientRef);

        if (recipientSnap.exists()) {
            const updatedRecipient = recipientSnap.data();

            const isCurrentUserBlocked = updatedRecipient.blocked.includes(userDetails.id);
            const isReceiverUserBlocked = userDetails.blocked.includes(recipientId);

            set({
                isCurrentUserBlocked,
                isReceiverUserBlocked,
                user: updatedRecipient, // Ensure updated recipient object
            });
        }
    },
}));
