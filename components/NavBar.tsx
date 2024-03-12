"use client"

import ThemeSwitcher from './ThemeSwitcher'
import Logo from './Logo'
import UserButton from './UserButton'
import { Divider } from 'antd'


function NavBar() {
  return (
    <>
      <nav className='flex w-full items-center justify-between p-4 px-8 h-[60px]'>
          <Logo/>
       <div className='flex gap-4 items-center'>
         <UserButton/>
         <ThemeSwitcher/>
       </div>
      </nav>
      <Divider className='bg-gray-300 my-0'/>
    </>
  )
}

export default NavBar
