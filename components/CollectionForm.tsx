"use client"

import { createCollectionSchema, createCollectionSchemaType } from '@/models/schema/createCollection'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function CollectionForm() {
    const [logError, setLogError] = useState('')
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

    // try {
    //     const response = await axios.post("/api/users/login", data)
    //     toast.success('Login success')
    //     reset()
    //     console.log("Login success", response.data)
    //     // setUser(data)
    //     setReRender((prev:boolean)=>!prev)
    //     router.push('/dashboard')
    // } 
    // catch (error:any) {
    //     console.log("Login failed",error)
    //     setLogError(error.message)
    //     toast.error(error.message)
    //  }
    };

  return (
    <div className='flex flex-col gap-6'>
        <h3 >
        {(isLoading || isSubmitting) 
        ? "Processing" 
        : "Collections are the way to group your tasks"}
            </h3>
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="grid grid-rows-4 gap-3 h-[280px] mform"
        autoComplete="off"
        noValidate>
            <label className='flex flex-col gap-1'>Name
                <input 
                {...register('name')}
                className='authinput'
                placeholder='Collection name'
                type="text" />
            </label>
            <label className='flex flex-col gap-1'>Color
                <input 
                {...register('color')}
                 className='authinput'
                 placeholder='Select collection color '
                type="text" />
            </label>
             <Button
            disabled={isSubmitting || !isDirty || !isValid}
            className="authbtn "
            type='primary'>
                Confirm
            </Button>
                { errors?.name  && (
                    <div className="autherror">
                    {errors.name && <div>{errors.name.message}</div>}
                  </div>
                )}
                {logError && <div className="autherror">{"Incorrect name "}</div>}
        </form>
      
    </div>
  )
}

export default CollectionForm
