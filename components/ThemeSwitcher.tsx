"use client"

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import React, { useState } from 'react'

interface ThemeSwitcherProps {
    theme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light') => void;
  }

  function ThemeSwitcher() {
      const {theme, setTheme} = useTheme()


const themeSetter = () => {
    if(theme === 'light'){
        setTheme('dark')
    }
    if(theme === 'dark'){
        setTheme('light')
    }

}
  return (
    <>
     <button 
      onClick={themeSetter} >
        {theme === 'light'  
        ? <SunIcon className="h-[1.2rem] w-[1.2rem]"/>
        :  <MoonIcon className="h-[1.2rem] w-[1.2rem]"/>}
        
     </button>
    </>
  )
}

export default ThemeSwitcher
