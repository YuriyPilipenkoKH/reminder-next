import React, { useContext, useState } from 'react';
import UserContext, { UserContextType } from '@/context/UserContext';
import { Button, Modal } from 'antd';
import { TfiTrash } from "react-icons/tfi";
import axios from 'axios';
import capitalize from '@/lib/capitalize';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import toast from 'react-hot-toast';

interface ConfirmModalProps {
    collection: CollectionTypes & {
        tasks: Task[]
    }
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({collection}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user , setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    removeCollection(collection._id)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const removeCollection = async( id:string) => {
    try {
        const response = await axios.delete(`/api/collections/dumpster/${id}`);
        toast.success(`Collection ${capitalize(collection?.name)} deleted`)
        setReRender(!reRender)
    }
     catch (error:any) {
        console.log("Trashing failed",error)
        toast.error(error.message)
     }
}
    const ty = `Are you sure deleting ${capitalize(collection?.name)} ?`

  return (
    <>
      <Button  onClick={showModal}>
      <TfiTrash />
      </Button>
      <Modal 
      title={ty}
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='flex flex-col gap-6'>
            <p>There will be no return...</p>
        </div>

      </Modal>
    </>
  );
};

export default ConfirmModal;