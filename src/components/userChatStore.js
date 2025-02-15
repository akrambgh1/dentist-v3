import { create } from 'zustand'
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    iscurrentUserBlocked: false, 
    isReceiverUserBlocked: false, 
    
    changeChat: (chatId, user) => {
        
        const userDetails = useUserStore.getState().userDetails;

        if (!userDetails) return;

        if (user.blocked.includes(userDetails.id)) {
            
            return set({
                chatId,
                user: null,
                iscurrentUserBlocked: true, 
                isReceiverUserBlocked: false, 
            });
        } else if (userDetails.blocked.includes(user.id)) {
            return  set({
                chatId,
                user: user,
                iscurrentUserBlocked: false,
                isReceiverUserBlocked: true,
            });
        } else {
            return   set({
                chatId,
                user,
                iscurrentUserBlocked: false,
                isReceiverUserBlocked: false,
            });
        }
    },
}));
