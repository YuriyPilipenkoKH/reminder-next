import React, { useContext, useState } from 'react';
import UserContext, { UserContextType } from '@/context/UserContext';
import {  Button, Modal, Tooltip } from 'antd';
import { TfiTrash } from "react-icons/tfi";
import axios from 'axios';
import capitalize from '@/lib/capitalize';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import toast from 'react-hot-toast';
import {Btn, BtnDelete} from '../Button/Button';


interface ConfirmModalProps {
    collection: CollectionTypes & {
        tasks: Task[]
    }
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({collection}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {  setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    removeCollection(collection._id)

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const removeCollection = async( id:string) => {
    try {
        const response = await axios.delete(`/api/collections/dumpster/${id}`)
        .then(response => {

          toast.success(`Collection ${capitalize(collection?.name)} deleted`)
          setReRender(!reRender)
        })
    }
     catch (error:any) {
        console.log("Trashing failed",error)
        toast.error(error.message)
     }
}
    const ty = `Are you sure deleting ${capitalize(collection?.name)} ?`

  return (
    <div className='removal'>
    <Tooltip title="Delete Collecttion" color={'#f00c'} placement="top">
      <Button  onClick={showModal}>
      <TfiTrash />
      </Button>
    </Tooltip>

    <Modal 
     className='removal_modal'
      title={ty}
      open={open}
      onOk={handleOk} 
      onCancel={handleCancel}
      footer={[
        <Btn
          key="back" 
          onClick={handleCancel}>
          Cancel
        </Btn>,
        <BtnDelete
          key="submit" 
          onClick={handleOk}>
          Delete
        </BtnDelete>,
      ]}
      >
    <div className=' flex flex-col gap-6 border-b-2'>
        <p>There will be no return...</p>
    </div>

      </Modal>
    </div>
  );
};

export default ConfirmModal;