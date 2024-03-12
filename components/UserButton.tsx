"use client"

import UserContext, { UserContextType } from '@/context/UserContext'
import { Button } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

function UserButton() {
    const {user, setUser} = useContext(UserContext as React.Context<UserContextType>)
    const router = useRouter()

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
        
    useEffect(() => {
        getUserDetails()
    }, [])
  return (
    <>
    {user && (
       <Button 
       onClick={()=> router.push('/profile')}
       type="primary" 
       shape="circle">
        {user?.name.charAt(0).toUpperCase()}
      </Button>
    )}
    </>
  )
}

export default UserButton
