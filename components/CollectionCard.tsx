"use client"

import capitalize from "@/lib/capitalize"
import CollectionTypes from "@/models/CollectionTypes"
import Task from "@/models/TaskTypes"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import toast from "react-hot-toast"

// console.log(Collection , Task)

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
    console.log('collection', collection)


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
    <div className="py-4 border-2 font-bold text-zinc-200 rounded-md">
        {capitalize(collection?.name)}
    </div>
  
  )
}

export default CollectionCard