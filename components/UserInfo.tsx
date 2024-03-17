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

interface UserData {
    name: string;
    email: string;
}

function UserInfo() {
  const {user, setUser, setReRender} = useContext(UserContext as React.Context<UserContextType>)
  const router = useRouter();

    const logout =async() => {
        try {
            const response = await axios.get("/api/users/logout")
            toast.success('Logout success')
    
            console.log("Logout success", response.data)
            setUser(null)
            setReRender((prev:boolean)=>!prev)
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
  
          <ProfileForm />
          <Button
           onClick={logout}
          className= "logout bg-red-600/90 text-neutral-100 font-bold px-6 py-2 rounded-lg">
            LogOut
          </Button>

         <button 
         onClick={()=> router.back()}
         className="absolute top-28 right-6">
           <Cross1Icon/>
         </button>
        </div>
    </div>
  )
}

export default UserInfo
