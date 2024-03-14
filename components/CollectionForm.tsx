"use client"

import { createCollectionSchema, createCollectionSchemaType } from '@/models/schema/createCollection'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ColorSelect from './ColorSelect'
import axios from 'axios'
import toast from 'react-hot-toast'
import UserContext, { UserContextType } from '@/context/UserContext'
import { useRouter } from "next/navigation";
import { wait } from '@/lib/wait'


function CollectionForm() {
    const [logError, setLogError] = useState('')
    const [selectedColor, setSelectedColor] = useState('');
    const { setUser ,setReRender} = useContext(UserContext as React.Context<UserContextType>);
    const router = useRouter();
    // console.log('selectedColor',selectedColor)
    const {
        register, 
        handleSubmit,
        formState,
        reset,
    } = useForm<createCollectionSchemaType>({
        defaultValues: {
            name: '',
            color: '',
        },
        mode:'all',
        resolver: zodResolver(createCollectionSchema),
    })
    const {
        errors,
        isDirty,
        isValid ,
        isSubmitting,
        isLoading
    } = formState

    const onSubmit =async (data:{
        name:string, 
        color:string 
    }) => {
        data.color = selectedColor
        console.log('onSubmit', data)

    try {
        const response = await axios.post("/api/collections/new", data)
        toast.success('New success')
        reset()
        console.log("New success", response.data)
        // setUser(data)
        // setReRender((prev:boolean)=>!prev)
        // router.push('/dashboard')
    } 
    catch (error:any) {
        console.log("New failed",error)
        setLogError(error.message)
        toast.error(error.message)
     }
    };

    const handleColorChange = (color:string) => {
        setSelectedColor(color); // Update the selected color in CollectionForm
    };


    useEffect ( () => {

    setLogError('')
    }, [logError])

  return (
    <div className='flex flex-col gap-6'>
        <h3 >
        {(isLoading || isSubmitting) 
        ? "Processing" 
        : "Collections are the way to group your tasks"}
            </h3>
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="grid grid-rows-4 gap-3  h-[280px] mform"
        autoComplete="off"
        noValidate>
            <label className='flex flex-col gap-1'>Collection Name
                <input 
                {...register('name')}
                className='authinput bg-slate-300'
                placeholder='Collection name'
                type="text" />
            </label>
           
            <label className='mlabel flex flex-col gap-1'>Collection Color
            <ColorSelect 
            onColorChange={handleColorChange}/>
            <input 
            className='visually-hidden'
            {...register('color')}
            // onChange={change}
            // value={selectedColor}
            type="text" />
            </label>
           
             <button
            disabled={isSubmitting || !isDirty || !isValid}
            className="authbtn cbtn"
            type='submit'>
                Confirm
            </button>
                { errors?.name  && (
                    <div className="autherror">
                    {errors.name && <div>{errors.name.message}</div>}
                  </div>
                )}
                {logError && <div className="autherror">{"Incorrect ?? "}</div>}
        </form>
      
    </div>
  )
}

export default CollectionForm


