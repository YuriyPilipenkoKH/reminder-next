"use client"

import UserContext, { UserContextType } from '@/context/UserContext'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

function UserButton() {
  const router = useRouter()
  const {user} = useContext(UserContext as React.Context<UserContextType>)
  return (
    <>
      <Button 
       onClick={()=> router.push('/profile')}
       type="primary" 
       shape="circle">
        {user?.name.charAt(0).toUpperCase()}
      </Button>
    </>
  )
}

export default UserButton
