import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'

import Chatheader from './Chatheader';
import MessageSkeleton from './MessageSkeleton';

import MessageInput from './MessageInput';
import { useAuthStore } from '../store/useauthstore';
import { formatMessageTime } from '../lib/utils';

function Chatcontainer() {

  const {messages,getmessages,ismessagesloading,selecteduser} = usechatstore();

  const {authuser} = useAuthStore();

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

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message)=>(
          <div
          key={message._id}
          className={`chat ${message.senderid ===authuser._id ? "chat-end" : "chat-start"}`}
          >

            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderid === authuser._id ? authuser.profilepic || "/PROJECT_PROFILE_IMG.jpg" : selecteduser.profilepic || "/PROJECT_PROFILE_IMG.jpg" } alt="profile pic" />
              </div>
            </div>

            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img
                src={message.image}
                alt='Attachment'
                className='sm:max-w-[200px] rounded-md mb-2'
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>

          </div>
        ))}
      </div>

      <MessageInput/>
      ChatContainer
    </div>
  )
}

export default Chatcontainer
