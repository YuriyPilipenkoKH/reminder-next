"use client"
import UserContext, { UserContextType } from "@/context/UserContext";
import React, { ChangeEvent, useState, useContext, useEffect,  } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from "@radix-ui/themes";


  interface AvatarFormProps {
      enable: boolean,
      editPhoto: boolean,
      setEditPhoto: (editPhoto: boolean) => void;
      setUrl: (fileUrl: string) => void;
  }

const AvatarForm: React.FC<AvatarFormProps> = ({
    enable, 
    editPhoto, 
    setEditPhoto,
    setUrl
  }) => {

  const [file, setFile] = useState<File | null>(null);  
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoadig] = useState(false);
  const {user, setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>)
  const userId = user?._id || null;  // Convert undefined to null

  const handleClickInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
        setUrl(URL.createObjectURL(selectedFile));
      }
  };
  const handleCancelAvatar = () => {
    setFile(null);
    setUrl('');
    setEditPhoto(false);
  };

  const handleAddAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !userId) {
      toast('Select an image and ensure the user is logged in');
      return; 
  }
    try {
     
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      setLoadig(true)

      const uploadResponse = await axios.post('/api/users/upload', formData)
         .then(response => {

          const uploadedFileUrl = response.data.fileUrl;
          console.log(uploadedFileUrl)
          setFileUrl(uploadedFileUrl);
          updateavatarUrl(uploadedFileUrl);
          toast("uploaded")
          setEditPhoto(false)
    })
    } 
    catch (error:any) {
      console.error('Error uploading file:', error);
    }
    finally{
      setLoadig(false)
    }
  
  }
  const updateavatarUrl = async (avatar: string) => {
    console.log('avatar', avatar)

  try {
    const updateResponse = await axios.patch("/api/users/updateavatar", {
      userId: user._id,
      avatarURL: avatar
    })
    .then(response => {

      const updatedUserData = response.data.user;
      toast.success(`${updatedUserData?.name}s avatar updated`);
      setReRender(!reRender);
  })
  } 
  catch (error:any) {
    console.log("Updating avatar failed",error)
  }
  finally{
    setLoadig(false)
  }
  }
  useEffect(() => {
    if (!enable) {
      handleCancelAvatar()
    }
  }, [enable]);
  return (
    <>
      <form 
          onSubmit={handleAddAvatar} 
          autoComplete="off"
          noValidate>
        <input 
          className="userPhoto_input "
          type="file"
          id="userPhoto"
          name="userPhoto"
          accept=".png, .jpg, .jpeg, .webp"
          hidden={!editPhoto}
          value=""
          onChange={handleClickInput}
          />
          {enable && editPhoto &&(
        <div className="two_btns absolute">
        <Button 
          className="abs_btn bg-red-600/90 disabled:bg-red-600/50"
          type="button"
          onClick={handleCancelAvatar}
          disabled={!file}
          >
            Cancel
        </Button>
        <Button 
          className="abs_btn  bg-green-600/90 disabled:bg-green-600/50" 
          type='submit'
          disabled={!file}>
            {loading  ? "Process" : "Confirm"}
        </Button>
        </div>
         )} 
        </form>
    </>
  );
};

export default AvatarForm;
