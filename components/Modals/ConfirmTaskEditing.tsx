import React, { useContext, useState } from 'react';
import UserContext, { UserContextType } from '@/context/UserContext';
import { Button, Modal, Tooltip } from 'antd';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import { GrEdit } from "react-icons/gr";
import { useForm } from 'react-hook-form';
import { createTaskSchema, createTaskSchemaType } from '@/models/schema/createTask';
import { zodResolver } from '@hookform/resolvers/zod';
import capitalize from '@/lib/capitalize';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ConfirmTaskEditingProps {
    collection: CollectionTypes 
     task: Task
     
}

const ConfirmTaskEditing: React.FC<ConfirmTaskEditingProps> = ({collection, task}) => {
  const {  setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);
  const [open, setOpen] = useState(false);
  const [logError, setLogError] = useState('')

  const formattedExpiresAt = task.expiresAt ? new Date(task.expiresAt).toISOString().slice(0, 16) : 'no expiration'; // Format expiresAt to string'yyyy-MM-dd') : ''; // Format expiresAt to string

  const {
    register, 
    handleSubmit,
    formState,
    reset
   } = useForm<createTaskSchemaType>({
    defaultValues: {
        content: task.content,
        expiresAt: formattedExpiresAt,
    },
    mode:'all',
    resolver: zodResolver(createTaskSchema),
})
const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
    isLoading,
} = formState

const onSubmit = async (data: createTaskSchemaType) => {
      
// Convert expiresAt string to Date object if it's not undefined
let expiryDate: Date | undefined;
if (data.expiresAt !== undefined) {
    expiryDate = new Date(data.expiresAt);
}
    try {

        const response = await axios.patch("/api/collections/edittask", {
            content: data.content,
            expiresAt: expiryDate,
            collectionId: collection._id,
            _id: task._id ,
        })
        .then(response => {
          toast.success(`Another task edited`)
          reset()
          setReRender(!reRender)
          handleCancel();
         
        })
    }
     catch (error:any) {
        console.log("Editing failed",error)
        setLogError(error?.response.data.error)
        toast.error(error.message)
     }
};

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip 
      title={task?.done ? '' : "Edit"}
      color={'#037305dd'} 
      >
        <Button 
        disabled={task?.done}
        className="mcard-content-btn"
        onClick={showModal}>
        <GrEdit />
        </Button>
     </Tooltip>

      <Modal className='task-modal '
        open={open}
        title={(isLoading || isSubmitting) 
            ? "Processing" 
            : "Edit a task of collection"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[  ]}
      >
            <div className='task-modal-w1'>
             <h1 className='modal-collection-name '>
             {capitalize(collection?.name)}
            </h1>
                <span >Write what you know</span>
            </div>
         <form 
            onSubmit={handleSubmit(onSubmit)}
            className='modal-form'
            autoComplete="off"
            noValidate>
                <label >Content
                    <textarea 
                     {...register('content')}
                    className="text_field resize-none w-full "
                    rows={5}
                    placeholder="Task conternt here"
                    />
                
                </label>
                <label className='flex flex-col gap-2 h-[60px]'>expires at
                    <input 
                    {...register('expiresAt')}
                     type="datetime-local"
                     className='expiry'
                     />
                </label>
          <button 
          className='authbtn task-create'
          disabled={isSubmitting || !isDirty || !isValid}
          type="submit"  
          >
           Apply changes
           </button>
           {( errors?.content || errors?.expiresAt )&& (
              <div className="autherror">
                {errors.content && <div>{errors.content.message}</div>}
                {!errors.content && errors.expiresAt && <div>{errors.expiresAt.message}</div>}
              </div>
            )}
            {logError && <div className="autherror">{logError}</div>}
          </form>
      </Modal>
    </>
  );
};

export default ConfirmTaskEditing;

