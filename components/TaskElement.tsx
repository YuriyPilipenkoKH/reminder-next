import { Button, Checkbox , CheckboxProps, Popover, Tooltip,} from 'antd'
import UserContext, { UserContextType } from "@/context/UserContext";
import { useContext } from "react";
import ConfirmTaskRemoval from "./ConfirmTaskRemoval"
import { format } from 'date-fns';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ConfirmTaskEditing from './ConfirmTaskEditing';

interface Props {
    collection: CollectionTypes
    task: Task
}

function TaskElement({collection, task} :Props) {
    const {user, setUser, setReRender} = useContext(UserContext as React.Context<UserContextType>)
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
            setReRender((prev:boolean)=>!prev)
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
        disabled={task?.done}
        onChange={onChange}>
        </Checkbox>

        <Popover content={task?.content} title="My Task">
            <div
            className="mcard-content-text">
                {task?.content}
            </div>
        </Popover>

        <div 
        className="mcard-content-date"> 
            {task?.expiresAt 
                ? format(new Date(task.expiresAt), 'dd.MM.yyyy') 
                : 'no expiration'
            }
        </div>
      
        <ConfirmTaskEditing 
             collection = {collection} 
             task = {task}/>
        <ConfirmTaskRemoval 
            collection = {collection} 
            task = {task}/>
      </div>
  )
}

export default TaskElement
