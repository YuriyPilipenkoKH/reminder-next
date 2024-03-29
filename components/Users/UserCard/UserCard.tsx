import User from '@/models/UserTypes'
import React from 'react'
import { Cell, RowWrap } from './UserCard.styled'

interface UserCardProps {
    user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <RowWrap className='RowWrap'>
       <Cell>{user?.name}</Cell>
       <Cell>{user?.email}</Cell>
       <Cell>{user?.phone}</Cell>
       <Cell>{user?.company}</Cell>
       <Cell>{user?.location}</Cell>
   
    </RowWrap>
  )
}

export default UserCard


