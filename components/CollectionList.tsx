"use client"

import UserContext, { UserContextType } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect,} from "react";
import toast from "react-hot-toast";
import CollectionCard from "./CollectionCard";
import CollectionTypes from "@/models/CollectionTypes";


function CollectionList() {
  const [list, setList] = useState<CollectionTypes[]>([]);
  const { user, setUser, reRender: boolean, setReRender} = useContext(UserContext as React.Context<UserContextType>);
  const router = useRouter();

  const grabUserColletions  = async() => {

    try {
      const response = await axios.get("/api/collections")
      if (response.data) {
        setList(response.data)
        console.log("Grabbed", response.data)
      }
     }
      catch (error:any) {
       console.log("Grabbing failed",error)

     }
   
  }
  
  useEffect(() => {
    grabUserColletions()
  }, [])
  return (
    <div className="flex flex-col w-full gap-4 mt-6">
    {list.map((collection) => (
      <CollectionCard
      key={collection.id}
      collection={collection}
      ></CollectionCard>
    ))}
  </div>
  )
}

export default CollectionList
