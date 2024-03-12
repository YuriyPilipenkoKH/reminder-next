"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"


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
       <h1>profile</h1>
       <button 
       onClick={logout}
       className="authbtn w-[200px]">logout</button>
      </div>
    )
  }
  
  export default Profile
  