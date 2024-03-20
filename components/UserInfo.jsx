"use client"

import UserContext from "@/context/UserContext";
import { useContext,  useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import ProfileForm from "./Forms/ProfileForm";
import { FiEdit } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi2";
import Image from "next/image";


function UserInfo() {
  const {user, setUser, setReRender, reRender} = useContext(UserContext )
  const [userPhoto, setUserPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [anable, setAnable] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)
  const router = useRouter();

  console.log('user', user)
  // console.log('previewImage', previewImage)

    const logout =async() => {
        try {
            const response = await axios.get("/api/users/logout")
            toast.success('Logout success')
    
            console.log("Logout success", response.data)
            setUser(null)
            setReRender(!reRender)
            router.push("/login ")                   
        } 
        catch (error) {
            console.log("Logout failed",error)
            toast.error(error.message)
           }
    }

    const handleAddAvatar = async(e) => {
      e.preventDefault()
      if (!userPhoto) {
        toast('Select image')
        return; // No file selected, do nothing
      }
      const formData = new FormData();
     formData.append('avatar', userPhoto);
     formData.append('userId', user._id);
      // console.log('formData', formData);
      try {
          const response = await axios.patch("/api/users/updateavatar",
           formData 
           )
        .then(response => {
          const updatedUserData = response.data.user;
 
          toast.success(`${updatedUserData?.name}s avatar updated`);
          setReRender(!reRender);
        })
    }
     catch (error) {
        console.log("Updating avatar failed",error)
        toast.error(error.message)
      }
  };

  const handleCancelAvatar = (e) => {
      setUserPhoto(null);
      // setEditPhoto(false);
  };

    const handleClickInput = (e) => {
      // setEdit(true);
      const file = e.target.files[0];
      
      if (file) {
          setUserPhoto(file);
          setPreviewImage(URL.createObjectURL(file));
      }
  };

    
  return (
    <div className="profile">
        <div className="profile_card  shadow-lg">
          <div className="avatar-wrap">
          {!!userPhoto &&  (
                <Image
                className="avatar"
                src={previewImage}
                alt="user avatar" 
                width={210}
                height={210}/>
            )}
            <form 
               action={handleAddAvatar} 
               autoComplete="off"
               noValidate>
              <input 
                className="userPhoto_input "
                type="file"
                id="userPhoto"
                name="userPhoto"
                accept=".png, .jpg, .jpeg, .webp"
                hidden={!editPhoto}
               //  disabled={!showData}
                value=""
                onChange={handleClickInput}
              />
          {editPhoto && (
          <div className="two_btns absolute">
            <Button 
            className="abs_btn bg-red-600/50"
            onClick={handleCancelAvatar}
            type="button">
              Cancel
            </Button>
            <Button 
            className="abs_btn  bg-green-600/50"
            onClick={handleAddAvatar}
            type='submit'>
              Confirm
            </Button>
          </div>
         )} 
            </form>
          </div>
  
          <ProfileForm 
          user={user}
          anable={anable}/>
          <Button
           onClick={logout}
           disabled={anable}
          className= "logout bg-red-600/90 text-neutral-100 font-bold px-6 py-2 rounded-lg disabled:bg-red-600/40">
            LogOut
          </Button>

         <div  className="open_key key_style">
           <button
           className="flex items-center justify-center p-2"
           onClick={()=> setAnable(!anable)}
          >
             { anable ?  <Cross1Icon /> : <FiEdit /> }
           </button>
         </div>
        { anable && (
         <div  className="edit_key key_style">
           <button
           className="flex items-center justify-center p-2"
           onClick={()=> setEditPhoto(!editPhoto)}
          >
             <HiOutlineCamera />
           </button>
         </div>
          ) }



        </div>
    </div>
  )
}

export default UserInfo
