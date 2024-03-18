"use client"

import UserContext, { UserContextType } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import capitalize from "@/lib/capitalize";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import ProfileForm from "./ProfileForm";
import { FiEdit } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi2";

interface UserData {
    name: string;
    email: string;
}

function UserInfo() {
  const {user, setUser, setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>)
  const [anable, setAnable] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)
  const router = useRouter();

    const logout =async() => {
        try {
            const response = await axios.get("/api/users/logout")
            toast.success('Logout success')
    
            console.log("Logout success", response.data)
            setUser(null)
            setReRender(!reRender)
            router.push("/login ")                   
        } 
        catch (error:any) {
            console.log("Logout failed",error)
            toast.error(error.message)
           }
    }
      
    
  return (
    <div className="profile">
        <div className="profile_card  shadow-lg">
          <div className="avatar">

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
         {editPhoto && (
          <div className="two_btns absolute">
            <Button className="abs_btn bg-red-600/50">
              Cancel
            </Button>
            <Button className="abs_btn  bg-green-600/50">
              Confirm
            </Button>
          </div>
         )} 


        </div>
    </div>
  )
}

export default UserInfo
