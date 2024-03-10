"use client"
import capitalize from "@/lib/capitalize";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"

interface UserData {
    name: string;
    email: string;
    // Add more properties if needed
}

function UserInfo() {
    const [data, setData] = useState<UserData | null>(null);
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
    
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/current')
        console.log(res.data);
        setData(res.data.data)
    }
    const profileName = capitalize(data?.name)
    
    useEffect(() => {
        getUserDetails()
    }, [])
  return (
    <div className="grid place-items-center h-screen ">
        <div className="shadow-lg p-8 bg-zinc-300 grid gap-4 rounded-lg w-80">
          <div>Name:
            <span className="font-bold ">
              {profileName }           
            </span>
          </div>
          <div>Email:
            <span className="font-bold ">
            {data?.email }</span>
          </div>
          <button
           onClick={logout}
          className="bg-red-600/90 text-neutral-100 font-bold px-6 py-2 rounded-lg">LogOut</button>
        </div>

    </div>
  )
}

export default UserInfo
