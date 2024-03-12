"use client"

import React, { ReactNode, useState } from 'react'
import UserContext from './UserContext'

function UserContextProvider({children} : {children:ReactNode}) {
    const [user, setUser] = useState(null)
    const [reRender, setReRender] = useState(false)

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      reRender, 
      setReRender 
      }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
