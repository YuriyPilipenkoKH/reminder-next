"use client"

import React, { ReactNode, useState } from 'react'
import UserContext from './UserContext'
import User from '@/models/UserTypes'
import { collectionsInfoTypes } from '@/models/CollectionTypes'

function UserContextProvider({children} : {children:ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [reRender, setReRender] = useState<boolean>(false)
    const [collectionsInfo, setCollectionsInfo] = useState<collectionsInfoTypes | null>(null)

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      reRender, 
      setReRender,
      collectionsInfo, 
      setCollectionsInfo 
      }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
