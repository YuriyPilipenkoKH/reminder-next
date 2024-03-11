"use client"

import React, { ReactNode, useState } from 'react'
import UserContext from './UserContext'

function UserContextProvider({children} : {children:ReactNode}) {
    const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
