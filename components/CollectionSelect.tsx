import UserContext, { UserContextType } from '@/context/UserContext';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { wait } from '@/lib/wait';
import React, { MouseEvent, useContext, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface CollectionSelectProps {
	currentCollectionName: string
	setValue: UseFormSetValue<{ collection: string }>; // Accept setValue
}

const CollectionSelect: React.FC<CollectionSelectProps> = ({currentCollectionName, setValue}) => {
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
			setSelectedCollection(collectionName);
			setColor(color);
			// await wait(500)
			// e.stopPropagation()
			setValue('collection', collectionName); // Set the value of the hidden input
			await wait(500)
			setOpen(false)
    }

  return (
    <>
			<div
				className={cn(`mselect w-full flex flex-col items-center justify-start gap-3 outline-none bg-slate-300`,
				CollectionColors[color as CollectionColor]
				)}
			>
			<span>{selectedCollection || 'make your choice'}</span>
			{open && collectionsInfo && Array.isArray(collectionsInfo) && (
				collectionsInfo
				.filter(collection => collection.name !== currentCollectionName) // Exclude the current collection
					.map((collection, idx) => (
        <button
					type='button'
					key={collection._id}
					onClick={(e) => choose(e, collection.name, collection.color)}
					className={cn(`moption  flex items-center justify-center w-full h-[38px] py-5 rounded-lg  focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-6  `,
					CollectionColors[color as CollectionColor]
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
				className='arrow'>
					<MdKeyboardArrowDown />
				</button>
		</>
	)
}

export default CollectionSelect