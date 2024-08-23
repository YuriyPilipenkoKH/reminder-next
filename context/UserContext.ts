import { collectionsInfoTypes } from '@/models/CollectionTypes';
import User from '@/models/UserTypes';
import React from 'react';

export interface UserContextType {
  user: User | null; // Define the type of your user object here
  setUser: React.Dispatch<any>; // Define the type of your setUser function here
  reRender:boolean;
  setReRender: React.Dispatch<boolean>;
  collectionsInfo:collectionsInfoTypes | null;
  setCollectionsInfo: React.Dispatch<collectionsInfoTypes>;
}

const UserContext = React.createContext<UserContextType | null>(null);

export default UserContext;
