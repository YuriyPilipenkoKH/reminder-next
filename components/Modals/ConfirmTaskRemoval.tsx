import React, { useContext, useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { TfiTrash } from "react-icons/tfi";
import axios from 'axios';
import capitalize from '@/lib/capitalize';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import toast from 'react-hot-toast';
import UserContext, { UserContextType } from '@/context/UserContext';
import { Btn, BtnDelete } from '../Button/Button';

interface ConfirmTaskRemovalProps {
    collection: CollectionTypes 
     task: Task
}

const ConfirmTaskRemoval: React.FC<ConfirmTaskRemovalProps> = ({collection, task}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {  setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    removeTask(task._id, collection._id)

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const removeTask = async( id:string, collectionId:string,) => {
    try {
        console.log('task id',id)
        const response = await axios.delete(`/api/collections/tasks/${id}`,
        {
            data: { collectionId } // Pass collectionId in the request body
        }
        )
        .then(response => {

          toast.success(`Task deleted`)
          setReRender(!reRender)
        })
    }
     catch (error:any) {
        console.log("Trashing failed",error)
        toast.error(error.message)
     }
}

    const words = task?.content.trim().split(/\s+/).slice(0, 2).join(' ')
    const ty = `Are you sure deleting ${words}.... `

  return (
    <> 
    <Tooltip title="Delete" color={'#f00c'} placement="top">
      <Button  
      className="mcard-content-btn"
      onClick={showModal}>
      <TfiTrash />
      </Button>
    </Tooltip>
      <Modal 
      className='removal_modal'
      open={open}
      title={ty}
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
        <div className='flex flex-col gap-6 border-b-2'>
            <p className='text-xs font-semibold'>From {capitalize(collection?.name)} ?</p>
            <p>There will be no return</p>
        </div>

      </Modal>
    </>
  );
};

export default ConfirmTaskRemoval;