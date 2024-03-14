"use client"

import { addDarkToHtml, getHtmlClasses, remDarkFromHtml } from '@/providers/darkProvider';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'

interface ThemeSwitcherProps {
    theme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light') => void;
  }

  function ThemeSwitcher() {
      const [theme, setTheme] = useState('')
      const themeSetter = () => {
          if(theme === 'light'){
              setTheme('dark')
          }
          if(theme === 'dark'){
              setTheme('light')
          }
        }

// HTML

const darkSetter = () => {
  
        let htmlClasses: string[] = []  
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
           htmlClasses = getHtmlClasses(htmlElement);
        }

          if(htmlClasses.includes("dark")){
            remDarkFromHtml()
            setTheme('')
          }
          else {
            addDarkToHtml()
            setTheme('dark')
          }
      }


  return (
    <>
     <button 
      onClick={darkSetter} >
        {theme === 'dark'  
        ? <MoonIcon className="h-[1.2rem] w-[1.2rem]"/>
        : <SunIcon className="h-[1.2rem] w-[1.2rem]"/>
        }
        
     </button>
    </>
  )
}

export default ThemeSwitcher
