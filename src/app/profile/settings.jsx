import { useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";

import { storage } from "@/app/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Settings = ({ setMessage }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Input change handler to store the selected file
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setImageFile(event.target.files[0]);
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      setImagePreview(previewUrl); // Set the image preview URL
    } else {
      setImagePreview(null); // Reset the preview if no file is selected
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;
    const storageRef = ref(
      storage,
      `profileImages/${auth.currentUser.uid}/${imageFile.name}`
    );
    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      const photoURL = await getDownloadURL(snapshot.ref);
      return photoURL; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image: ", error);
      setMessage("Error uploading image");
    }
  };

  const handleUpdateProfile = async () => {
    if (imageFile) {
      const uploadedPhotoURL = await uploadImage();
      if (uploadedPhotoURL) {
        await updateProfile({ displayName, photoURL: uploadedPhotoURL });
        setMessage("Updated Profile");
      }
    } else {
      await updateProfile({ displayName });
      setMessage("Updated Profile");
    }
  };

  useEffect(() => {
    // Cleanup function to revoke the created URL
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  //////////////////////////////////

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updateProfile, updating, error] = useUpdateProfile(auth);

  if (error) {
    setMessage("Error Updating Profile");
  }
  if (updating) {
    setMessage("Updating Profile");
  }

  return (
    <div className="bg-sky-950 px-4 md:px-10 pt-2 pb-6 rounded-lg shadow-xl w-80 md:w-96 ">
      <h6 className="text-white text-[16px] mb-5">Profile Details</h6>
      <input
        type="displayName"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[15px]"
      />

      <div
        className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6"
        id="dropzone"
      >
      <input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
/>
        <div className="text-center ">
          {/* Image Preview */}
          {imagePreview ? (
            <div className="mb-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="rounded-full h-24 w-24 object-cover"
              />
            </div>
          ) : (
            <UserCircleIcon className="h-20 w-20 mx-auto" />
          )}

          <h3 className="mt-2 text-sm font-light text-white">
            <label for="file-upload" className="relative">
              <span>Drag and drop</span>
              <span className="text-indigo-400"> or browse </span>
              <span>to upload</span>
              <input
                accept="image/*"
                onChange={handleFileChange}
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
          </h3>
          {/* <p class="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
        </div>
      </div>

      <button
        className="w-full mt-4 p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 text-[15px]"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </button>
    </div>
  );
};

export default Settings;
