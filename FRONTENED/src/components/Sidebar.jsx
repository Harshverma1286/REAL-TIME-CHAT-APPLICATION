import React, { useEffect, useState } from 'react'
import { usechatstore } from '../store/usechatstore'
import Sidebarskeleton from './Sidebarskeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useauthstore';

function Sidebar() {

    const {getusers,users,selecteduser,setselecteduser,isusersloading} = usechatstore();

    const {onlineusers} = useAuthStore();

    const [showonlineonly,setshowonlineonly] = useState(false);

    useEffect(()=>{
      getusers();
    },[getusers]);

    const filterusers = showonlineonly ? users.filter(user=> onlineusers.includes(user._id)) : users;

    if(isusersloading) return <Sidebarskeleton/>


    return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showonlineonly}
              onChange={(e) => setshowonlineonly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineusers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filterusers.map((user) => (
          <button
            key={user._id}
            onClick={() => setselecteduser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selecteduser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineusers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineusers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filterusers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};


  

export default Sidebar;
