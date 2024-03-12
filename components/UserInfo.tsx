"use client"

import UserContext, { UserContextType } from "@/context/UserContext";
import capitalize from "@/lib/capitalize";
import { Button } from "@radix-ui/themes";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast"

interface UserData {
    name: string;
    email: string;
}

function UserInfo() {
   
    // const [data, setData] = useState<UserData | null>(null);
    const router = useRouter();

    const {user, setUser, setReRender} = useContext(UserContext as React.Context<UserContextType>)

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
    
    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/current')
            console.log(res.data);
            if(res.data) {
                setUser(res.data.data)
            }
            
        }
        catch (error:any) {
            console.log("getUserDetails failed",error)
           }
    }
    const profileName = capitalize(user?.name)
    
    useEffect(() => {
        getUserDetails()
    }, [])
  return (
    <div className="grid place-items-center h-screen ">
        <div className="shadow-lg p-8 bg-zinc-300 grid gap-4 rounded-lg w-80">
          <div>Name: {' '}
            <span className="font-bold ">
              {profileName }           
            </span>
         
          </div>
          <div>Email: {' '}
            <span className="font-bold ">
            {user?.email}
            </span>
          </div>
          <Button
           onClick={logout}
          className="bg-red-600/90 text-neutral-100 font-bold px-6 py-2 rounded-lg">LogOut</Button>
        </div>

    </div>
  )
}

export default UserInfo
