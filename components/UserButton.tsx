"use client"

import UserContext, { UserContextType } from '@/context/UserContext'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

function UserButton() {
  const router = useRouter()
  const {user} = useContext(UserContext as React.Context<UserContextType>)

    // Check if user is defined before accessing its properties
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';
 
  return (
    <>
      <Button 
       onClick={()=> router.push('/profile')}
       type="primary" 
       shape="circle">
        {userInitial}
      </Button>
    </>
  )
}

export default UserButton
