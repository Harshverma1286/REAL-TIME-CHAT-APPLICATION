import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import axios from 'axios';

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
}))