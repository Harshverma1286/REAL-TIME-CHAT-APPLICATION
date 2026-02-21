import { Camera, Mail, User } from 'lucide-react';
import React, { useState } from 'react'

function Profilepage() {
  const {authuser,isUpdatingProfile,updateprofile} = useAuthStore();

  const [profileimg,setprofileimg] = useState(null);


  const handleimageupload = async(e)=>{
    const file = e.target.files[0];

    if(!file) return ;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async()=>{
      const baseurl = reader.result;

      setprofileimg(baseurl);

      await updateprofile({profilepic:baseurl});
    }
  }
  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Proile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* avatar upload */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img src={profileimg ||authuser.profilepic || '/avatar.png'} alt="profile"
              className='size-32 rounded-full object-cover border-4'/>
              <label
              htmlFor='avatar-upload'
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ""}`}>
                <Camera className='w-5 h-5 text-base-200'/>
                <input 
                type="file"
                id='avatar-upload'
                className='hidden'
                accept='image/*'
                onChange={handleimageupload}
                disabled={isUpdatingProfile}
                 />
              </label>              
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "uploading..." : "click the camera icon to upload your photo"}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='w-4 h-4'/>
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authuser?.fullname}</p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='w-4 h-4'/>
                Email Adress
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authuser?.email}</p>
            </div>
          </div>

          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Member since</span>
                <span>{authuser.createdAt?.split("T")[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilepage
