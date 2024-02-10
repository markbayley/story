import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/config";
import { useState } from 'react';

const Settings = () => {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [updateProfile, updating, error] = useUpdateProfile(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (updating) {
    return <p>Updating...</p>;
  }
  return (
    <div className="bg-sky-950 px-4 md:px-10 pt-2 pb-6 rounded-lg shadow-xl w-80 md:w-96 ">
    <h6 className="text-white text-[16px] mb-5">Profile Details</h6>
      <input
        type="displayName"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[13px]"
      />
      <input
        type="photoURL"
        placeholder="Profile Photo"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[13px]"
      />
      <button
       className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 text-[14px]"
        onClick={async () => {
          const success = await updateProfile({ displayName, photoURL });
          if (success) {
            alert('Updated profile');
          }
        }}
      >
        Update Profile
      </button>
    </div>
  );
};

export default Settings