"use client"

import CollectionList from "@/components/CollectionList";
import SubDrawer from "@/components/SubDrawer";
import UserContext, { UserContextType } from "@/context/UserContext";
import capitalize from "@/lib/capitalize";
import { useContext } from "react";


function Dashboard() {
  const { user} = useContext(UserContext as React.Context<UserContextType>);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center flex flex-col flex-grow w-full items-center gap-4 p-4 max-w-[700px]">
       <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-cyan-900 bg-clip-text text-transparent">
          Welcome {' '}
        {capitalize(user?.name)}
       </h1>
         <SubDrawer/>
         <CollectionList/>
         
      </div>
    </div>
  )
}

export default Dashboard
