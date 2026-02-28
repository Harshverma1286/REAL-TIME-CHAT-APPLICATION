import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set)=>({
    authuser:null,

    isCheckingAuth:true,

    isSigningUp:false,

    isLoggingIng:false,

    isUpdatingProfile:false,

    onlineusers:[],

    checkauth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authuser:res.data});

            get().connectsocket();

        } catch (error) {
            console.log("Error in checkauth",error);
            set({authuser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async()=>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup",data);

            set({authuser:res.data});

            toast.success("Account created successfully");

            get().connectsocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp:false});
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authuser:null})

            toast.success("Logged out successfully");
            get().disconnectsocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async(data)=>{
        set({isLoggingIng:true})

        try {
            const res = await axiosInstance.post("/auth/login",data);

            set({authuser:res.data});

            toast.success("logged in successfully");
            get().connectsocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isLoggingIng:false});
        }
    },

    updateprofile: async(data)=>{
        set({isUpdatingProfile:true});

        try {
            const res = await axiosInstance.put('/auth/update-profile',data);

            set({authuser:res.data});
            toast.success("profile updated successfully");

        } catch (error) {
            console.log("error in update profile",error);
            toast.error(error.response.data.message);
            
        }finally{
            set({isUpdatingProfile:false});
        }
    },
   
    connectsocket:()=>{
        const {authuser} = get();
        if(!authuser && get().socket.connected)return;
        const socket = io(BASE_URL,{
            query:{
                userid:authuser._id,
            }
        });
        socket.connect()

        set({socket:socket});

        socket.on("getonlineusers",(userids)=>{
            set({onlineusers:userids})
        })
    },

    disconnectsocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
}))