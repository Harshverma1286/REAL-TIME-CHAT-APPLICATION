import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'

import Chatheader from './Chatheader';
import MessageSkeleton from './MessageSkeleton';

import MessageInput from './MessageInput';

function Chatcontainer() {

  const {messages,getmessages,ismessagesloading,selecteduser} = usechatstore();

  useEffect(()=>{
    getmessages(selecteduser._id)
  },[selecteduser._id,getmessages]);

  if(ismessagesloading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <Chatheader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <Chatheader/>

      <p>messages...</p>

      <MessageInput/>
      ChatContainer
    </div>
  )
}

export default Chatcontainer
