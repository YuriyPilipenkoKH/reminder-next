import toast from 'react-hot-toast';
import axios from 'axios';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import { useContext, useEffect, useState } from 'react';
import UserContext, { UserContextType } from '@/context/UserContext';
import capitalize from '@/lib/capitalize';
import { Button, Modal, Tooltip } from 'antd';
import { GrEdit } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { moveTaskSchema, moveTaskSchemaType } from '@/models/schema/moveTask';
import { MdMoving } from "react-icons/md";
import { nanoid } from 'nanoid';
import { wait } from '@/lib/wait';
import CollectionSelect from '../CollectionSelect';

interface ConfirmTaskMovingProps {
    collection: CollectionTypes 
     task: Task
}

const ConfirmTaskMoving: React.FC<ConfirmTaskMovingProps> = ({collection, task}) => {
  const {setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);
  const [open, setOpen] = useState(false);
  const [logError, setLogError] = useState('')
  const [canceling, setCanceling] = useState<boolean>(false);
  const {
    register, 
    handleSubmit,
    formState,
    reset,
    watch,
    setValue
   } = useForm<moveTaskSchemaType>({
    defaultValues: {
        collection: '',
    },
    mode:'all',
    resolver: zodResolver(moveTaskSchema),
})
const {
    errors,defaultValues,
    isDirty,
    isValid ,
    isSubmitting,
    isLoading,
} = formState


  const onSubmit = async (data: moveTaskSchemaType) => {
    // console.log('data', data)
    try {
      const newTaskId = nanoid(15); 

      // First, make the PATCH request to move the task
      const patchResponse = await axios.patch("/api/collections/movetask", {
          collectionName: data.collection,
          content: task.content,
          expiresAt: task.expiresAt,
          done: task.done,
          _id: newTaskId,
      });

      // If the PATCH request is successful, proceed to delete the task
      if (patchResponse.status === 200) {
        toast.success(patchResponse?.data?.message);

        const deleteResponse = await axios.delete("/api/collections/movetask", {
            data: { 
                rmTaskId: task._id,
                rmCollectionId: collection._id,
            },
        });
      await wait(1000)

      // Handle the response from the delete request
      toast.success(deleteResponse?.data?.message);
      setReRender(!reRender);
      reset();
      handleCancel();
      }
    }
    catch (error : any) {
      console.log("Moving task failed",error)
      setLogError(error?.response?.data?.message)
      toast.error(error.response?.data?.message)
    }

    };

    const showModal = () => {
      setOpen(true);
    };
  
    const handleOk = () => {
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    };
  
    const handleCancel = () => {
      setCanceling(true)
      setOpen(false);
      reset()
      setLogError('')

    };
    const watchedCollection = watch('collection')
    useEffect(() => {
      setLogError('')
  }, [watchedCollection])

  return (
    <>
    <Tooltip 
      title={task?.done ? '' : "Move"}
      color={'#037305dd'} 
      >
    <Button 
      className="mcard-content-btn"
      onClick={showModal}>
        <MdMoving />
    </Button>
     </Tooltip>
      <Modal 
        className='task-modal '
        open={open}
        title={(isLoading || isSubmitting) 
          ? "Processing" 
          : `Move a task from ${capitalize(collection?.name)}`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[  ]}
      >
      <div className='task-modal-w1'>
      </div>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='modal-form'
        autoComplete="off"
        noValidate>

          <label className='flex flex-col gap-2 h-[60px]'>
           { ( isValid )
              ? 'to'
              : 'Choose collection'}
            <CollectionSelect
            currentCollectionName={collection.name}
            setValue={setValue}
            canceling={canceling}
            />
            <input 
            {...register('collection')}
              type="text"
              className='visually-hidden'
              />
              
          </label>

          <button 
            className='authbtn task-create'
            disabled={ isSubmitting || !isValid }
            type="submit"  
          >
           Apply changes
           </button>
           {/* {( errors?.content || errors?.expiresAt )&& (
              <div className="autherror">
                {errors.content && <div>{errors.content.message}</div>}
                {!errors.content && errors.expiresAt && <div>{errors.expiresAt.message}</div>}
              </div>
            )} */}
            {logError && <div className="autherror">{logError}</div>}
          </form>
      </Modal>
    </>
  )
}

export default ConfirmTaskMoving