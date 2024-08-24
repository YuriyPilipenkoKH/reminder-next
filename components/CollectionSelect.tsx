import UserContext, { UserContextType } from '@/context/UserContext';
import React, { useContext, useState } from 'react'

function CollectionSelect() {
    const [open, setOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    const { reRender, collectionsInfo} = useContext(UserContext as React.Context<UserContextType>);
    console.log('collectionsInfo', collectionsInfo)

  return (
    <div>CollectionSelect</div>
  )
}

export default CollectionSelect