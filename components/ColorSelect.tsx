"use client"

import { CollectionColor, CollectionColors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

type ColorChangeHandler = (color: string) => void;

interface ColorSelectProps {
    onColorChange: ColorChangeHandler;
}

function ColorSelect({ onColorChange }: ColorSelectProps) {
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState('')
    const [selectedColor, setSelectedColor] = useState('');

    console.log('color', color)
    const click=() => {
        setOpen(!open)
    }
    const choose=(color:any) => {
      setColor(color);
      setSelectedColor(color);
        // console.log('choose',e.target.value)
        setOpen(false)
        // e.stopPropagation();
        onColorChange(color)
    }
  return (
      
      <>
    <div
        className={cn(`mselect w-full flex flex-col items-center justify-start gap-3 outline-none bg-slate-300`,
       CollectionColors[color as CollectionColor]
       )}
    >
      <span className='absolute flex h-[38px] bottom-0 items-center '>
        {color}</span>
    {open && (
     Object.keys(CollectionColors).map((color , idx)=> (
        <button
        type='button'
        key={color}
        onClick={() => choose(color)}
        // value={color}
        className={cn(`moption  flex items-center justify-center w-full h-[38px] py-5 rounded-lg  focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-6  `,
        CollectionColors[color as CollectionColor]
        )}
        >
        {color}
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

export default ColorSelect



