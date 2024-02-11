
import { useState } from 'react';

const Contact = ({ setMessage}) => {
  const [displayName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');


  return (
    <div className="bg-sky-950 px-4 md:px-10 pt-2 pb-6 rounded-lg shadow-xl w-80 md:w-96 ">
    <h6 className="text-white text-[16px] mb-5">Your Message</h6>
    <input
        type="text"
        placeholder="Name"
        value={displayName}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[15px]"
      />
      <textarea
        type="text"
        rows={3}
        placeholder="Say Something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[15px]"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[15px]"
      />
  
      <button
       className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 text-[15px]"
        // onClick={async () => {
        //   const success = await updateProfile({ displayName, photoURL });
        //   if (success) {
        //     setMessage('Email Sent!');
        //   }
        // }}
      >
        Send Message
      </button>
    </div>
  );
};

export default Contact