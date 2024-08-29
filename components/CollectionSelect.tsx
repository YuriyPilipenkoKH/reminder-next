import UserContext, { UserContextType } from '@/context/UserContext';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { wait } from '@/lib/wait';
import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface CollectionSelectProps {
	currentCollectionName: string
	setValue: UseFormSetValue<{ collection: string }>; // Accept setValue
	canceling: boolean
	onSelectCollection: (collectionName: string) => void;
}

const CollectionSelect: React.FC<CollectionSelectProps> = ({
	currentCollectionName, 
	setValue,
	canceling ,
	onSelectCollection
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    const [selectedCollection, setSelectedCollection] = useState<string>('')
    const {  collectionsInfo } = useContext(UserContext as React.Context<UserContextType>);
    // console.log('collectionsInfo', collectionsInfo)
    console.log('selectedCollection', selectedCollection)

    const click=() => {
        setOpen(!open)
    }
		const choose= async(e: MouseEvent<HTMLButtonElement>, collectionName: string, color: string) => {
			console.log(collectionName, color)
			setSelectedCollection(collectionName)
			onSelectCollection(collectionName)
			setColor(color)
			// e.stopPropagation()
			setValue('collection', selectedCollection) // Set the value of the hidden input
			await wait(500)
		  setOpen(false)
    }
		
    useEffect(() => {
			if(canceling) {
				setSelectedCollection('')
				setColor('')
				setOpen(!open)
			}
			}, [canceling])

  return (
    <div className='relative'>
			<div
				className={cn(`mselect w-full flex flex-col items-center justify-start outline-none gap-2 bg-slate-300`,
				CollectionColors[color as CollectionColor]
				)}
			>
			<span className={cn(
					'text-gray-700 font-semibold flex  items-center justify-center ',
					selectedCollection && 'text-slate-300'
			)}>
				{selectedCollection || 'make your choice'}
			</span>
			{open && collectionsInfo && Array.isArray(collectionsInfo) && (
				collectionsInfo
				.filter(collection => collection.name !== currentCollectionName) // Exclude the current collection
					.map((collection, idx) => (
        <button
					type='button'
					key={collection._id}
					onClick={(e) => choose(e, collection.name, collection.color)}
					className={cn(`moption  flex items-center justify-center  py-3 rounded-lg  focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-6  `,
						CollectionColors[collection.color as CollectionColor]
					)}
					>
					{collection.name}
        </button>
        ))
        )}
			</div>
				<button 
				type='button'
				onClick={click}
				className='arrow pos1'>
					<MdKeyboardArrowDown />
				</button>
		</div>
	)
}

export default CollectionSelect