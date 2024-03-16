import React, { useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import { TfiTrash } from "react-icons/tfi";
import axios from 'axios';
import capitalize from '@/lib/capitalize';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import toast from 'react-hot-toast';
import UserContext, { UserContextType } from '@/context/UserContext';

interface ConfirmTaskRemovalProps {
    collection: CollectionTypes 
     task: Task
}

const ConfirmTaskRemoval: React.FC<ConfirmTaskRemovalProps> = ({collection, task}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user , setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // removeCollection(collection._id)
    removeTask(task._id, collection._id)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const removeTask = async( id:string, collectionId:string,) => {
    try {
        console.log('task id',id)
        const response = await axios.delete(`/api/collections/tasks/${id}`,
        {
            data: { collectionId } // Pass collectionId in the request body
        }
        );
        toast.success(`Task deleted`)
        setReRender(!reRender)
    }
     catch (error:any) {
        console.log("Trashing failed",error)
        toast.error(error.message)
     }
}


    const ty = `Are you sure deleting ${capitalize(task?.content)}.... `

  return (
    <>
      <Button  onClick={showModal}>
      <TfiTrash />
      </Button>
      <Modal 
      title={ty}
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='flex flex-col gap-6'>
            <p className='text-xs font-semibold'>From {capitalize(collection?.name)} ?</p>
            <p>There will be no return</p>
        </div>

      </Modal>
    </>
  );
};

export default ConfirmTaskRemoval;