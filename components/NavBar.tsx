
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
// import Logo from './Logo'




function NavBar() {
  return (
    <nav className='flex w-full items-center justify-between p-4 px-8 h-[60px]'>
        {/* <Logo/> */}
     <div className='flex gap-4 items-center'>
       {/* <UserButton afterSignOutUrl="/"/> */}
       
     </div>
    </nav>
  )
}

export default NavBar
