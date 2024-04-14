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
import { nanoid } from 'nanoid';

interface Props {
    visible: boolean;
    onClose: () => void;
    collection: CollectionTypes 
  }

  const NewTaskModal: React.FC<Props> = ({ visible, onClose, collection }) => {
    const [logError, setLogError] = useState('')
    const { user , setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);
    const {
        register, 
        handleSubmit,
        formState,
        reset,
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
;
    // Convert expiresAt string to Date object if it's not undefined
    let expiryDate: Date | undefined;
    if (data.expiresAt !== undefined) {
        expiryDate = new Date(data.expiresAt);
    }
    try {
      const taskId = nanoid(15); // Generate a ID for the task
      const response = await axios.patch("/api/collections/addtask", {
          content: data.content,
          expiresAt: expiryDate,
          collectionId: collection._id,
          _id: taskId ,
          done: false
        })
        .then(response => {
          toast.success(`Another crucial task added`)
          // console.log(response.data)
          reset()
          onClose();
          setReRender(!reRender)
        })
        }
      catch (error:any) {
        console.log("Creation failed",error)
        setLogError(error?.response.data.error)
        toast.error(error.message)
      }
    };

  const handleCancel = () => {
    reset()
    onClose();
  };

  return (
    <>
      <Modal
        className='task-modal '
        open={visible}
        title={(isLoading || isSubmitting) 
          ? "Processing" 
          : "Add a task to collection"}
        onOk={handleSubmit(onSubmit)} 
        onCancel={handleCancel}
        footer={[ ]}
      >
            <div className='task-modal-w1'>
             <h1 className='modal-collection-name '>
             {capitalize(collection?.name)}
            </h1>
                <span >You can add as many tasks as you want</span>
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
              <label className=' flex flex-col gap-2 h-[60px]'>expires at
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


