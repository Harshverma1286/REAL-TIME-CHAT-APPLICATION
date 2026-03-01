import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { useAuthStore } from './useauthstore';

export const usechatstore = create((set)=>({
    messages:[],
    users:[],
    selecteduser:null,
    isusersloading:false,
    ismessagesloading:false,

    getusers:async()=>{
        set({isusersloading:true});
        try {
            const res = await axiosInstance.get("/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally{
            set({isusersloading:false});
        }
    },

    getmessages: async(userid)=>{
        set({ismessagesloading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userid}`);
            set({messages:res.data});
        } catch (error) {
            
        }finally{
            set({ismessagesloading:false});
        }
    },

    setselecteduser:(selecteduser)=> set({selecteduser}),

    sendmessage:async(messagedata)=>{
        const {selecteduser,messages} = get();

        try {
            const res = await axiosInstance.post(`/message/${selecteduser._id}`,messagedata);

            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);

        }

    },

    subscribetomessage:()=>{
        const {selecteduser} = get();

        if(!selecteduser) return;

        const socket = useAuthStore.getState().socket;



        socket.on("newmessage",(newmessage)=>{
            if(newmessage.senderid!== selecteduser._id) return;
            set({
                messages:[...get().messages,newmessage]
            })
        });
    },

    unsubscribetomessages:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newmessage");
    }
}))