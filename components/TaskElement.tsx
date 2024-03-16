import { Button, Checkbox , CheckboxProps,} from 'antd'
import React from 'react'
import { GrEdit } from "react-icons/gr";
import ConfirmTaskRemoval from "./ConfirmTaskRemoval"
import { format } from 'date-fns';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
    collection: CollectionTypes
    task: Task
}

function TaskElement({collection, task} :Props) {
    const router = useRouter()

     const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setTaskToDone(task._id, collection._id)
      };


      const setTaskToDone = async( id:string, collectionId:string,) => {
        try {
            console.log('task id',id)
            const response = await axios.patch(`/api/collections/tasks/done/`,
            { collectionId, id }
            );
            toast.success(`Task done`)
            router.refresh()
        }
         catch (error:any) {
            console.log("Setting done failed",error)
            toast.error(error.message)
         }
    }


  return (
    <div 

    className="row"
    >
        <Checkbox 
        className="box"
        onChange={onChange}>
        </Checkbox>

        <span 
        className="mcard-content-text">
            {task?.content}
        </span>
        <span 
        className="mcard-content-date"> 
            {task?.expiresAt 
                ? format(new Date(task.expiresAt), 'dd.MM.yyyy') 
                : 'no expiration'
            }
        </span>
        <Button className="mcard-content-btn">
          <GrEdit />
        </Button>
        <ConfirmTaskRemoval 
        collection = {collection} 
        task = {task}/>
    </div>
  )
}

export default TaskElement
