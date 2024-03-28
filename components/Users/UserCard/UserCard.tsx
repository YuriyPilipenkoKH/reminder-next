import User from '@/models/UserTypes'
import React from 'react'

interface UserCardProps {
    user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className='flex gap-3'>
       <div>{user?.name}</div>
       <div>{user?.email}</div>
       <div>{user?.phone}</div>
       <div>{user?.company}</div>
       <div>{user?.location}</div>
   
    </div>
  )
}

export default UserCard