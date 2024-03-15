"use client"

import capitalize from "@/lib/capitalize"
import { CollectionColor, CollectionColors } from "@/lib/constants"
import { cn } from "@/lib/utils"
import CollectionTypes from "@/models/CollectionTypes"
import Task from "@/models/TaskTypes"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import toast from "react-hot-toast"


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
    <div

    className={cn(`mcard py-4 border-2  text-zinc-200 rounded-md`,
    CollectionColors[collection.color as CollectionColor]
    )}
    >
        <h2 className="mcard-title font-bold">{capitalize(collection?.name)}</h2>
    </div>
  
  )
}

export default CollectionCard