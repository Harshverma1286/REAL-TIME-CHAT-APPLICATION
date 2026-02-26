import React, { useRef, useState } from 'react'
import { usechatstore } from '../store/usechatstore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

function MessageInput() {

  const [text,settext] = useState("");
  const [imagepreview,setimagepreview] = useState(null);

  const fileinput = useRef(null);

  const {sendmessage} = usechatstore();

  const handleimagechange = (e)=>{
    const file = e.target.files[0];

    if(!file.type.startsWith("image/")){
      toast.error("please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = ()=>{
      setimagepreview(reader.result);
    }

    reader.readAsDataURL(file);
  };

  const removeimage = ()=>{
    setimagepreview(null);
    if(fileinput.current) fileinput.current.value = "";
  };

  const handlesendmessage = async(e)=>{
    e.preventDefault();

    if(!text.trim() && !imagepreview) return;

    try {
      await sendmessage({
        text:text.trim(),
        image:imagepreview
      });

      settext("");

      setimagepreview(null);

      if(fileinput.current) fileinput.current.value = "";
    } catch (error) {
      console.error("failed to send message",error);
    }
  }
    return (
    <div className='p-4 w-full'>
      {imagepreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img src={imagepreview}
             alt="preview"
             className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
             />
             <button
             onClick={removeimage}
             type='button'
             className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justtify-center'
             >
              <X className='size-3'/>
             </button>
          </div>
        </div> 
      )}


      <form onSubmit={handlesendmessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input type="text"
          className='w-full input input-bordered rounded-lg input-sm sm:input-md'
          placeholder='Type a message ...'
          value={text}
          onChange={(e)=> settext(e.target.value)}
          />
          <input 
          type="file" 
          accept='image/*'
          className='hidden'
          ref={fileinput}
          onChange={handleimagechange}
          />

          <button 
          type='button'
          className={`hidden sm:flex btn btn-circle
            ${imagepreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={()=> fileinput.current?.click()}
          >
            <Image size={20}/>
          </button>
        </div>

        <button
        type='submit'
        className='btn btn-sm btn-circle'
        disabled={!text.trim() && !imagepreview}>
          <Send size={22}/>
        </button>
      </form>
    </div>
  )
}

export default MessageInput
