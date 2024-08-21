import toast from 'react-hot-toast';
import axios from 'axios';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import { useContext, useState } from 'react';
import UserContext, { UserContextType } from '@/context/UserContext';
import capitalize from '@/lib/capitalize';
import { Button, Modal, Tooltip } from 'antd';
import { GrEdit } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { moveTaskSchema, moveTaskSchemaType } from '@/models/schema/moveTask';
import { MdMoving } from "react-icons/md";
import { nanoid } from 'nanoid';

interface ConfirmTaskMovingProps {
    collection: CollectionTypes 
     task: Task
     
}

const ConfirmTaskMoving: React.FC<ConfirmTaskMovingProps> = ({collection, task}) => {
  const {  setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);
  const [open, setOpen] = useState(false);
  const [logError, setLogError] = useState('')
  const {
    register, 
    handleSubmit,
    formState,
    reset
   } = useForm<moveTaskSchemaType>({
    defaultValues: {
        collection: '',

    },
    mode:'all',
    resolver: zodResolver(moveTaskSchema),
})
const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
    isLoading,
} = formState

  const onSubmit = async (data: moveTaskSchemaType) => {
    console.log(data)
    // Convert expiresAt string to Date object if it's not undefined
    // let expiryDate: Date | undefined;
    // if (data.expiresAt !== undefined) {
    //     expiryDate = new Date(data.expiresAt);
    // }
    try {
      const taskId = nanoid(15); 
      const response = await axios.patch("/api/collections/movetask", {
        collectionName: data.collection,
        content: task .content,
        expiresAt: task.expiresAt,
        done: task.done,
        _id: taskId ,
         
      })
      .then(response => {
        toast.success(response?.data?.message)
        setReRender(!reRender)
      })
    }
    catch (error : any) {
      console.log("Moving task failed",error)
      setLogError(error?.response.data.error)
      toast.error(error.message)
    }
    finally{
      reset()
      handleCancel();
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
      setOpen(false);
    };
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

          <label className='flex flex-col gap-2 h-[60px]'>Choose collection
            <input 
            {...register('collection')}
              type="text"
              // className='expiry'
              />
          </label>
          <button 
          className='authbtn task-create'
          // disabled={isSubmitting || !isDirty || !isValid}
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