"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

function UserInfo() {
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
    <div className="grid place-items-center h-screen ">
        <div className="shadow-lg p-8 bg-zinc-300 grid gap-4 rounded-lg">
          <div>Name:
            <span className="font-bold ">John</span>
          </div>
          <div>Email:
            <span className="font-bold ">John@mail</span>
          </div>
          <button
           onClick={logout}
          className="bg-red-600/90 text-neutral-100 font-bold px-6 py-2 rounded-lg">LogOut</button>
        </div>

    </div>
  )
}

export default UserInfo
