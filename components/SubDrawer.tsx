"use client"

import React, { useContext, useEffect, useState } from 'react';
import {  Drawer } from 'antd';
import CollectionForm from './CollectionForm';
import UserContext, { UserContextType } from '@/context/UserContext';

const SubDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
      const { reRender } = useContext(UserContext as React.Context<UserContextType>);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

    useEffect(() => {
      onClose()
    }, [reRender])
  return (
    <>
   <div className="w-full  rounded-lg  bg-slate-200 p-[2px]" >
      <button 
        type="button"
        className="dark:text-white w-full dark:bg-neutral-950 bg-green-700  rounded-lg h-10"
        onClick={showDrawer}>
        <span className="bg-slate-200 bg-clip-text text-transparent">
          Create Collection</span>
      </button>
    </div>
      <Drawer 
      title="Add new collection" 
      style={{backgroundColor:"#555"}}
      onClose={onClose} 
      open={open}>

      <CollectionForm />

      </Drawer>
    </>
  );
};

export default SubDrawer;