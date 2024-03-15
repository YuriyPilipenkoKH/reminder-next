"use client"

import capitalize from "@/lib/capitalize"
import { CollectionColor, CollectionColors } from "@/lib/constants"
import { cn } from "@/lib/utils"
import CollectionTypes from "@/models/CollectionTypes"
import Task from "@/models/TaskTypes"
import { Divider } from "antd"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import toast from "react-hot-toast"
import { MdKeyboardArrowDown } from "react-icons/md"
import { TfiTrash } from "react-icons/tfi";
import { BsPlusSquare } from "react-icons/bs";

interface Props {
    collection: CollectionTypes & {
        tasks: Task[]
    }
}

function CollectionCard({collection} :Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const {tasks} = collection 
    const router = useRouter()



    // const totalTasks = collection.tasks.length
    // const tasksDone = useMemo(() => {
    //     return collection.tasks.filter(task => task.done).length
    // }, [collection.tasks])
    // const progress = totalTasks === 0  ? 0 :  (tasksDone / totalTasks) * 100

    const removeCollection = async() => {
        try {
            // await deleteCollection(collection.id)
            toast.success(`success` )
            router.refresh()
            }
            catch (error:any) {
                toast.error(error.message)
        }
    }

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
            <div className="mcard-content">
                <div className="LIST"></div>
            </div>
                <Divider/>
            <div className="mcard-footer">
                <h3>Created at</h3>
                <div className="footer-btn-wrap">
                    <button>
                    <BsPlusSquare />
                    </button>
                    <button>
                    <TfiTrash />
                    </button>
                </div>
            </div>
        </>
        )}
    </div>
  
  )
}

export default CollectionCard