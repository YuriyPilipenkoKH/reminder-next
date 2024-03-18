"use client"

import { createCollectionSchema, createCollectionSchemaType } from '@/models/schema/createCollection'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ColorSelect from './ColorSelect'
import axios from 'axios'
import toast from 'react-hot-toast'
import UserContext, { UserContextType } from '@/context/UserContext'

interface CollectionFormProps {
    setIsSubmitting: (isSubmitting: boolean) => void; // Define setIsSubmitting prop
  }


function CollectionForm({ setIsSubmitting }: CollectionFormProps)  {
    const [logError, setLogError] = useState('')
    const [selectedColor, setSelectedColor] = useState('');

    const { user , setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>);
 
    const {
        register, 
        handleSubmit,
        formState,
        reset,
        watch
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
        isLoading,
    } = formState

    const onSubmit =async (data:{
        name:string, 
        color:string 
    }) => {
        data.color = selectedColor
        console.log('onSubmit',data)

        setIsSubmitting(true)
    try {
        const response = await axios.post("/api/collections/new", {
            name: data.name,
            color:data.color,
            userId: user._id
        })
        toast.success(`${data?.name} created successfully` )
        reset()
        console.log("Creation success", response.data)
        setReRender(!reRender)
    } 
    catch (error:any) {
        console.log("Creation failed",error)
        setLogError(error?.response.data.error)
        toast.error(error.message)
     }
     finally {
        setIsSubmitting(false); // Set isSubmitting back to false after submission
      }
    };

    const handleColorChange = (color:string) => {
        setSelectedColor(color); // Update the selected color in CollectionForm
    };

    const watchedCollectionName = watch('name')
    useEffect(() => {
        setLogError('')
    }, [watchedCollectionName])


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
                {(logError && !isSubmitting ) && <div className="autherror">{logError}</div>}
        </form>
      
    </div>
  )
}

export default CollectionForm


