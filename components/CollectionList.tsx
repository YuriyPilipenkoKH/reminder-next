"use client"

import UserContext, { UserContextType } from "@/context/UserContext";
import axios from "axios";
import { useContext, useState, useEffect,} from "react";
import CollectionCard from "./CollectionCard";
import CollectionTypes from "@/models/CollectionTypes";

function CollectionList() {
  const [list, setList] = useState<CollectionTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const { user,  reRender } = useContext(UserContext as React.Context<UserContextType>);
  const userId = user?._id

  const grabUserCollections = async (id: string | null) => {
       setLoading(true);
    try {
      const response = await axios.get(`/api/collections/grab/${id}`)
      .then(response => {

        if (response.data && response.data.collections) {
          setList(response.data.collections);
        }
      })

    } catch (error) {
      console.log("Grabbing failed", error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    grabUserCollections(userId);
  }, [reRender, userId]);

  const collectionsOfCurrentUser = list.filter((c) => c.userId === user?._id);

  return (
    <div className="flex flex-col w-full gap-4 mt-6">
      {collectionsOfCurrentUser.map((collection) => (
        <CollectionCard key={collection._id} collection={collection} />
      ))}
    </div>
  );
}

export default CollectionList;



