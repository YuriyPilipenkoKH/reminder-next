import CollectionTypes from '@/models/CollectionTypes'
import Task from '@/models/TaskTypes'
import React, { useState } from 'react'
import ConfirmTaskEditing from './Modals/ConfirmTaskEditing'
import ConfirmTaskMoving from './Modals/ConfirmTaskMoving'
import ConfirmTaskRemoval from './Modals/ConfirmTaskRemoval'
import { Button } from 'antd'
import { RiFunctionLine } from "react-icons/ri";
import { CgChevronDoubleDownR } from "react-icons/cg";

interface ButtonHolderProps {
    collection: CollectionTypes 
     task: Task
}

const ButtonHolder: React.FC<ButtonHolderProps> = ({collection, task}) => {
	const [open, setOpen] = useState(false);
  return (
    <div className='ml-auto'>
			{open ? (
				<div  className='flex gap-1 items-center justify-center'>
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
			) : (
				<div>
					<Button
						// className="mcard-content-btn"
						onClick={()=> setOpen(!open)}>
							<CgChevronDoubleDownR />
					</Button>
				</div>
			) }
    </div>
  )
}

export default ButtonHolder