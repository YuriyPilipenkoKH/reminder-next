import { Checkbox , CheckboxProps, Popover, Tooltip,} from 'antd'
import UserContext, { UserContextType } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import ConfirmTaskRemoval from "./Modals/ConfirmTaskRemoval"
import { format } from 'date-fns';
import CollectionTypes from '@/models/CollectionTypes';
import Task from '@/models/TaskTypes';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ConfirmTaskEditing from './Modals/ConfirmTaskEditing';
import { cn } from '@/lib/utils';
import capitalize from '@/lib/capitalize';
import ConfirmTaskMoving from './Modals/ConfirmTaskMoving';

interface Props {
    collection: CollectionTypes
    task: Task
}

function TaskElement({collection, task} :Props) {
    const { setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>)
    const router = useRouter()
		const [windowWidth, setWindowWidth] = useState<number>(0);

     const onChange: CheckboxProps['onChange'] = (e) => {
        // console.log(`checked = ${e.target.checked}`);
        setTaskToDone(task._id, collection._id)
      };

      const setTaskToDone = async( id:string, collectionId:string,) => {
        try {
            console.log('task id',id)
            const response = await axios.patch(`/api/collections/tasks/done/`,
            { collectionId, id }
            )
            .then(response => {
                toast.success(`Task done`)
                setReRender(!reRender);
            })
        }
         catch (error:any) {
            console.log("Setting done failed",error)
            toast.error(error.message)
         }
    }

    const popoverTitle:string = "My Task from  " + capitalize(collection?.name)

		useEffect(() => {
			// Function to update the width
			const handleResize = () => setWindowWidth(window.innerWidth);
			// Set the initial width
			handleResize();
			// Add event listener
			window.addEventListener('resize', handleResize);
			// Cleanup on unmount
			return () => window.removeEventListener('resize', handleResize);

	}, []);
  return (
    <div 
    className="row relative"
    >
    <Tooltip 
        title={task?.done ? "Done" : "Set Done"}
        color={'#037305dd'} 
        >
        <Checkbox 
        className="box"
        disabled={task?.done}
        onChange={onChange}>
        </Checkbox>
    </Tooltip>
        <div className={cn('green-spot',
            !task?.done && 'visually-hidden'
            )}>
        </div>

        <Popover 
        content={task?.content}
        // defaultOpen
         title={popoverTitle}>
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
        <ConfirmTaskMoving 
             collection = {collection} 
             task = {task}/>
        <ConfirmTaskRemoval 
            collection = {collection} 
            task = {task}/>
      </div>
  )
}

export default TaskElement
