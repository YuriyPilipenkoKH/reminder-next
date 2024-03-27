"use client"

import ThemeSwitcher from './ThemeSwitcher'
import Logo from './Logo'
import UserButton from './UserButton'
import { Button, Divider } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import UserContext, { UserContextType } from '@/context/UserContext'
import axios from 'axios'
import Dashboard from './Dashboard'


function NavBar() {
  const {user, setUser, reRender} = useContext(UserContext as React.Context<UserContextType>)
  const router = useRouter() 
  // Retrieve query string values
  const params = useParams()
  const isLoginPage = params?.login === 'login';


  const getUserDetails = async () => {
      try {
          const res = await axios.get('/api/users/current')
          .then(response => {
            if(response.data) {
                setUser(response.data.data)
                // console.log(res.data);
            }
          })
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
          <div className='flex gap-5 items-center'>
            <Logo/>
            {user && <Dashboard/> }
          </div>
       <div className='flex gap-4 items-center'>
        {!user && !isLoginPage  && (
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
