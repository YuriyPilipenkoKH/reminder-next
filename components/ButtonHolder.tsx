import CollectionTypes from '@/models/CollectionTypes'
import Task from '@/models/TaskTypes'
import React, { useState } from 'react'
import ConfirmTaskEditing from './Modals/ConfirmTaskEditing'
import ConfirmTaskMoving from './Modals/ConfirmTaskMoving'
import ConfirmTaskRemoval from './Modals/ConfirmTaskRemoval'
import { Button } from 'antd'
import { FaWindowClose } from "react-icons/fa";
import { CgChevronDoubleDownR } from "react-icons/cg";
import { PiDotsThreeOutline } from "react-icons/pi";
import { FlatBtn } from './Button/Button'


interface ButtonHolderProps {
    collection: CollectionTypes 
     task: Task
}

const ButtonHolder: React.FC<ButtonHolderProps> = ({collection, task}) => {
	const [open, setOpen] = useState(false);
  return (
    <div >
			{open ? (
				<div  className='flex gap-1 items-center justify-end'>
					<ConfirmTaskEditing
							collection = {collection}
							task = {task}/>
					<ConfirmTaskMoving
							collection = {collection}
							task = {task}/>
					<ConfirmTaskRemoval
						collection = {collection}
						task = {task}/>
						<FlatBtn 
						onClick={()=> setOpen(false)}>
							<FaWindowClose/>
						</FlatBtn>
				</div>
			) : (
				<div>
					<Button
						className="mcard-content-btn"
						onClick={()=> setOpen(!open)}>
							<PiDotsThreeOutline />
					</Button>
				</div>
			) }
    </div>
  )
}

export default ButtonHolder