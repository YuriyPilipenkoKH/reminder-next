"use client"

import capitalize from "@/lib/capitalize"
import { CollectionColor, CollectionColors } from "@/lib/constants"
import { cn } from "@/lib/utils"
import CollectionTypes from "@/models/CollectionTypes"
import Task from "@/models/TaskTypes"
import { Divider } from "antd"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useMemo, useState, useTransition } from "react"
import toast from "react-hot-toast"
import { MdKeyboardArrowDown } from "react-icons/md"
import { GrEdit } from "react-icons/gr";
import { TfiTrash } from "react-icons/tfi";
import { BsPlusSquare } from "react-icons/bs";
import NewTaskModal from "./NewTaskModal"
import { format } from 'date-fns';
import UserContext, { UserContextType } from "@/context/UserContext"
import axios from "axios"

interface Props {
    collection: CollectionTypes & {
        tasks: Task[]
    }
}

function CollectionCard({collection} :Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
    const { user , setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);
    const {tasks } = collection 
    const router = useRouter()
    console.log('tasks', tasks)

    const toggleNewTaskModal = () => {
        setNewTaskModalOpen(!isNewTaskModalOpen);
      };
// console.log('collection ',collection )
    // const totalTasks = collection.tasks.length
    // const tasksDone = useMemo(() => {
    //     return collection.tasks.filter(task => task.done).length
    // }, [collection.tasks])
    // const progress = totalTasks === 0  ? 0 :  (tasksDone / totalTasks) * 100

    const removeCollection = async( id:string) => {
        try {
            const response = await axios.delete(`/api/collections/dumpster/${id}`);
            toast.success(`Collection ${capitalize(collection.name)} deleted`)
            setReRender(!reRender)
        }
         catch (error:any) {
            console.log("Trashing failed",error)
            toast.error(error.message)
         }
    }
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
    // useEffect(() => {
       
    //   }, [reRender]);

  return (
    <div className="mcard">
        <div
        className={cn(`mcard-head py-4 border-2  text-zinc-200 rounded-md`,
        isOpen && 'rounded-b-none',
        CollectionColors[collection.color as CollectionColor]
        )}
        >
            <button
            type="button"

            onClick={()=> setIsOpen(!isOpen)}
            className="mcard-title-btn w-full h-full bg-transparent font-bold">
                {capitalize(collection?.name)}
            </button>
            <MdKeyboardArrowDown className="mcard-title-arrow" size={40} />
        </div>
        {isOpen && (
        <>
        <div className="mcard-content flex flex-col gap-4 py-2 px-6">
            {tasks && tasks.length > 0 ? (
                tasks.map(task => (

                    <div key={task._id} className="flex items-center align-middle justify-between gap-6 text-[1rem]">
                        <span className="">{task?.content}</span>
                        <span className=""> 
                            {task?.expiresAt 
                                ? format(new Date(task.expiresAt), 'dd.MM.yyyy') 
                                : 'No expiration date'
                            }
                        </span>
                        <button >
                          <GrEdit />
                        </button>
                        <button onClick={() => removeTask(task._id,collection._id)}>
                          <TfiTrash />
                        </button>
                    </div>
                ))
            ) : (
                <div>No tasks available</div>
            )}
        </div>
                <Divider/>
            <div className="mcard-footer">
                <h3>Created at</h3>
                <div className="footer-btn-wrap">
                    <button 
                    onClick={toggleNewTaskModal} 
                    >
                    <BsPlusSquare />
                    </button>
                    <button onClick={() => removeCollection(collection._id)}>
                    <TfiTrash />
                    </button>
                </div>
            </div>
        </>
        )}

     <NewTaskModal 
        collection={collection}
      visible={isNewTaskModalOpen}
      onClose={toggleNewTaskModal}/>
    </div>
  )
}

export default CollectionCard

