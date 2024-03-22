"use client"
import UserContext, { UserContextType } from "@/context/UserContext";
import React, { ChangeEvent, useState, useContext,  } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from "@radix-ui/themes";


interface AvatarFormProps {
    anable: boolean,
    editPhoto: boolean,
    setEditPhoto: (editPhoto: boolean) => void;
    setUrl: (fileUrl: string) => void;
}

const AvatarForm: React.FC<AvatarFormProps> = ({
  anable, 
  editPhoto, 
  setEditPhoto,
  setUrl
}) => {

  const [file, setFile] = useState<File | null>(null);  
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoadig] = useState(false);
  const {user, setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>)
  // console.log('file', file)
  // console.log('fileUrl', fileUrl)
  // console.log('user', user)


  const handleClickInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
        setUrl(URL.createObjectURL(selectedFile));
      }
  };
  const handleCancelAvatar = (e:any) => {
    setFile(null);
    setUrl('');
    setEditPhoto(false);
};

  const handleAddAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
        toast('Select image')
        return; // No file selected, do nothing
      }
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
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
  return (
    <>
    {/* { !!user?.avatarURL && (
        <img
        className="avatar"
        src={user.avatarURL}
        alt="user avatar" 
        width={210}
        height={210}/>
    )}
              {!!file &&  (
                <img
                className="avatar"
                src={fileUrl}
                alt="user avatar" 
                width={210}
                height={210}/>
            )} */}
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
      
          {anable && editPhoto &&(
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
