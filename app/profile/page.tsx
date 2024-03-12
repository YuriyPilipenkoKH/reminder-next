"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import UserInfo from "@/components/UserInfo"


function Profile() {
    const router = useRouter();
    const logout =async() => {
        try {
            const response = await axios.get("/api/users/logout")
            toast.success('Logout success')
    
            console.log("Logout success", response.data)
            router.push("/login ")                   
        } 
        catch (error:any) {
            console.log("Logout failed",error)
            toast.error(error.message)
            
        }
    }
    return (
      <div className="grid place-items-center">
        <UserInfo/>

      </div>
    )
  }
  
  export default Profile
  