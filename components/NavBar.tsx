"use client"

import ThemeSwitcher from './ThemeSwitcher'
import Logo from './Logo'
import UserButton from './UserButton'
import { Button, Divider } from 'antd'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import UserContext, { UserContextType } from '@/context/UserContext'
import axios from 'axios'
import Dashboard from './Dashboard'
import toast from 'react-hot-toast'


function NavBar() {
  const {user, setUser, reRender,setReRender} = useContext(UserContext as React.Context<UserContextType>)
  const router = useRouter() 

  // const isLoginPage = router.pathname === '/login';


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
  }, [reRender])
  return (
    <>
      <nav className='flex w-full items-center justify-between p-4 px-8 h-[60px]'>
          <div className='flex gap-4 items-center'>
            <Logo/>
            {user && <Dashboard/> }
          </div>
       <div className='flex gap-4 items-center'>
        {!user && (
          <Button
          onClick={()=> router.push('/login')}>
            Login</Button>
        )}
       {user && (
         <UserButton />

       )}
         <ThemeSwitcher/>
       </div>
      </nav>
      <Divider className='bg-gray-300 my-0'/>
    </>
  )
}

export default NavBar
