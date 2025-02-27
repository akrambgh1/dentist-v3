import { create } from "zustand";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverUserBlocked: false,

    changeChat: (chatId, user) => {
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
            chatId,
            user: isCurrentUserBlocked ? null : user, // Nullify if blocked
            isCurrentUserBlocked,
            isReceiverUserBlocked,
        });
    },

    changeBlock: () => {
        set((state) => {
            const userDetails = useUserStore.getState().userDetails;
            if (!userDetails || !state.user) return state;

            const updatedBlockedList = userDetails.blocked.includes(state.user.id)
                ? userDetails.blocked.filter((id) => id !== state.user.id) // Unblock user
                : [...userDetails.blocked, state.user.id]; // Block user

            // Update Zustand's `useUserStore` to reflect the change globally
            useUserStore.setState({ userDetails: { ...userDetails, blocked: updatedBlockedList } });

            return { isReceiverUserBlocked: !state.isReceiverUserBlocked };
        });
    },
}));
