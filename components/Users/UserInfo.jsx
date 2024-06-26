"use client"

import UserContext from "@/context/UserContext";
import { useContext,  useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import ProfileForm from "../Forms/ProfileForm";
import { FiEdit } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi2";
import AvatarForm from "../Forms/AvatarForm";
import { AvatarWrap } from "./UserInfo.styled";


function UserInfo() {
  const {user, setUser,} = useContext(UserContext )
  const [enable, setEnable] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)
  const [fileUrl, setUrl] = useState('');
  const router = useRouter();


    const logout =async() => {
      try {
          const response = await axios.get("/api/users/logout")
          .then(response => {
            toast.success('Logout success')
            // console.log("Logout success", response.data)
            setUser(null)
            router.push("/login ")                   
          })
      } 
      catch (error) {
          console.log("Logout failed",error)
          toast.error(error.message)
          }
    }

  return (
    <div className="profile">
        <div 
        className="profile_card  shadow-lg">
          <AvatarWrap 
          fileurl={fileUrl}
          avatarurl = {user?.avatarURL}
          className="avatar-wrap">
            <AvatarForm 
            enable={enable}
            setEditPhoto={setEditPhoto}
            editPhoto={editPhoto}
            setUrl={setUrl}
            />
          </AvatarWrap>
  
          <ProfileForm 
          user={user}
          enable={enable}/>
          <Button
           onClick={logout}
           disabled={enable}
          className= "logout bg-red-600/90 text-neutral-100 font-bold px-6 py-2 rounded-lg disabled:bg-red-600/40">
            LogOut
          </Button>

         <div  className="open_key key_style">
           <button
           className="flex items-center justify-center p-2"
           onClick={()=> setEnable(!enable)}
          >
             { enable ?  <Cross1Icon /> : <FiEdit /> }
           </button>
         </div>
        { enable && (
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
