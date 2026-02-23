import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'
import Sidebarskeleton from './Sidebarskeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useauthstore';

function Sidebar() {

    const {getusers,users,selecteduser,setselecteduser,isusersloading} = usechatstore();

    const {onlineusers} = useAuthStore();

    useEffect(()=>{
      getusers();
    },[getusers]);

    if(isusersloading) return <Sidebarskeleton/>
  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className='border-b borer-base-300 w-full p-5'>
        <div className='flex items-center gap-2'>
          <Users className='size-6'/>
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>

        <div className='overflow-y-auto w-full py-3'>
          {users.map((user)=>(
            <button
            key={user._id}
            onClick={()=> setselecteduser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selecteduser?._id ===user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>

              <div className='relative mx-auto lg:mx-0'>
                <img src={user.profilepic || "./PROJECT_PROFILE_PIC.jpg"} alt={user.name} />
                {onlineusers.includes(user._id) && (
                  <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'/>
                )}
              </div>

              <div className='hidden lg:block text-left min-w-0'>
                <div className='font-medium truncate'>{user.fullname}</div>
                <div className='text-sm text-zinc-400'>
                  {onlineusers.includes(user._id) ? "online" : "offline"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
