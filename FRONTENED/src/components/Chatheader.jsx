import React from 'react'
import { usechatstore } from '../store/usechatstore'
import { useAuthStore } from '../store/useauthstore';
import { X } from 'lucide-react';

function Chatheader() {

    const {selecteduser,setselecteduser} = usechatstore();

    const {onlineusers} = useAuthStore();
  return (
    <div className='p-2.5 border-b border-base-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selecteduser.profilepic || './avatar.png'} alt={selecteduser.fullname} />
                    </div>
                </div>

                <div>
                    <h3 className='font-medium'>{selecteduser.fullname}</h3>
                    <p className='text-sm text-base-content/70'>
                    {onlineusers.includes(selecteduser._id) ? "online" : "offline"}
                    </p>
                </div>
            </div>

            <button onClick={()=> setselecteduser(null)}>
                <X/>
            </button>
        </div>
      
    </div>
  )
}

export default Chatheader
