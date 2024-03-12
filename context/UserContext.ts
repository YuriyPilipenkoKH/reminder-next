import React from 'react';

export interface UserContextType {
  user: any; // Define the type of your user object here
  setUser: React.Dispatch<any>; // Define the type of your setUser function here
  reRender:boolean;
  setReRender: React.Dispatch<any>;
}

const UserContext = React.createContext<UserContextType | null>(null);

export default UserContext;
