import { create } from "zustand";
import { useUserStore } from "./userStore";


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
        if (user.blocked.includes(userDetails.id)) {

         return   set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverUserBlocked: false,
                
            });
        }
       else if (userDetails.blocked.includes(user.id)) {

            return   set({
                   chatId,
                   user,
                   isCurrentUserBlocked: false,
                   isReceiverUserBlocked: true,
                   
               });
        } else {
             return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverUserBlocked: false,
                
            });
           }
        
    },
    changeBlock: () => {
        set(state=>({...state,isReceiverUserBlocked: !state.isReceiverUserBlocked}))
    }


   
}));
