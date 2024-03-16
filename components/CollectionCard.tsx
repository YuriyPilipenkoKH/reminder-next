"use client"

import capitalize from "@/lib/capitalize"
import { CollectionColor, CollectionColors } from "@/lib/constants"
import { cn } from "@/lib/utils"
import CollectionTypes from "@/models/CollectionTypes"
import Task from "@/models/TaskTypes"
import { Button, Checkbox, CheckboxProps, Divider } from "antd"
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
import ConfirmModal from "./ConfirmModal"
import TaskElement from "./TaskElement"


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
        <div className="mcard-content ">
            {tasks && tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskElement key={task._id}
                    task={task}
                    collection={collection}/>
                ))
            ) : (
                <div>No tasks available</div>
            )}
        </div>
                <Divider/>
            <div className="mcard-footer">
                <span className="text-[0.8rem] ">Created at: {' '}
                {format(new Date(collection?.createdAt || ''), 'dd.MM.yyyy HH:mm')}
                </span>
                <div className="footer-btn-wrap">
                    <Button 
                    onClick={toggleNewTaskModal} 
                    >
                    <BsPlusSquare />
                    </Button>
                    <ConfirmModal collection = {collection}/>
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

