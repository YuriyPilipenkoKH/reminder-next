"use client"

import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import capitalize from '@/lib/capitalize';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, createTaskSchemaType } from '@/models/schema/createTask';
import axios from 'axios';
import UserContext, { UserContextType } from '@/context/UserContext';
import CollectionTypes from '@/models/CollectionTypes';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    visible: boolean;
    onClose: () => void;
    collection: CollectionTypes 
  }

  const NewTaskModal: React.FC<Props> = ({ visible, onClose, collection }) => {
    const [logError, setLogError] = useState('')
    const { user , setReRender} = useContext(UserContext as React.Context<UserContextType>);
    const {
        register, 
        handleSubmit,
        formState,
        reset,
        watch
    } = useForm<createTaskSchemaType>({
        defaultValues: {
            content: '',
            expiresAt: ''
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
        
        console.log('Submit', data);
          
    // Convert expiresAt string to Date object if it's not undefined
    let expiryDate: Date | undefined;
    if (data.expiresAt !== undefined) {
        expiryDate = new Date(data.expiresAt);
    }
        try {
          const taskId = uuidv4(); // Generate a UUID for the task
            const response = await axios.patch("/api/collections/addtask", {
                content: data.content,
                expiresAt: expiryDate,
                collectionId: collection._id,
                _id: 'j55' // Assign the generated UUID as the task ID
            })
            toast.success(`success task`)
            // console.log(response.data)
            reset()
            onClose();
            setReRender((prev:boolean)=>!prev)
        }
         catch (error:any) {
            console.log("Creation failed",error)
            setLogError(error?.response.data.error)
            toast.error(error.message)
         }
    };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        className='task-modal'
        open={visible}
        title="Add task to collection "
        onOk={handleSubmit(onSubmit)} 
        onCancel={handleCancel}
        footer={[ ]}
      >
            <div className='task-modal-w1'>
             <h1 className='modal-collection-name'>
             {capitalize(collection?.name)}
            </h1>
                <span>
                {(isLoading || isSubmitting) 
                ? "Processing" 
                : "Add a task to your collection"}
                </span><br />
                <span>You can add as many tasks as you want</span>
            </div>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className='modal-form'
            autoComplete="off"
            noValidate>
                <label >Content
                    <textarea 
                     {...register('content')}
                    className="resize-none w-full border-slate-600" 
                    rows={5}
                    placeholder="Task conternt here"
                    >
                    </textarea>
                </label>
                <label className='flex flex-col gap-2'>expires at
                    <input 
                    {...register('expiresAt')}
                    type="datetime-local"
                     />
                </label>
          <button 
          className='authbtn task-create'
          disabled={isSubmitting || !isDirty || !isValid}
          type="submit"  
          >
           Add Task
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

export default NewTaskModal;


