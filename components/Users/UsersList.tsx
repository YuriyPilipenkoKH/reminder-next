"use client"

import UserContext, { UserContextType } from '@/context/UserContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

function UsersList() {
  const {reRender, } = useContext(UserContext as React.Context<UserContextType>);
  const [list, setList] = useState<any[]>([]);
  console.log(list)

  const grabUsersData = async () => {
    try {
      const response = await axios.get(`/api/users/grab`)
      .then(response => {
        if (response.data && response.data.usersList) {
          setList(response.data.usersList);
        }
        })
    } 
    catch (error) {
      console.log("Grabbing failed", error);
    }
  }

    useEffect(() => {
      grabUsersData();
    }, [reRender]);
  return (
    <div>
      {list && (
        <div>
          {list.map((user) => (
            <div key={user?._id}>
              <div>{user?.name}</div>
              <div>{user?.email}</div>
            </div>
          ))}
        </div>
      )}
      <div>{}</div>
    </div>
  )
}

export default UsersList
