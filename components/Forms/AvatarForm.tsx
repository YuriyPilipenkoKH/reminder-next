"use client"

import { avatarFormSchema, avatarFormSchemaType } from '@/models/avatarFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

function AvatarForm() {

    const {
        register, 
        handleSubmit,
        formState,
        reset,
    } = useForm<avatarFormSchemaType>({
        defaultValues: {
            avatarURL:'',
            text:'',
  
        },
        mode:'all',
        resolver: zodResolver(avatarFormSchema),
    })
    const {
        errors,
        isDirty,
        isValid ,
        isSubmitting,
        isLoading,
    } = formState

    const onSubmit =async (data: avatarFormSchemaType) => {
        console.log(data)
        // Since avatarURL is a file, you need to access it from event.target.files
        const formData = new FormData();
        formData.append("avatarURL", data.avatarURL[0]); 
        // Assuming only one file is selected
        console.log(formData);
         // Check if formData contains the file
        // Now you can send formData to the server using fetch or axios
    }
  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
    autoComplete="off"
    noValidate
    >
        <label >
            <input 
             {...register('avatarURL')}
             accept=".png, .jpg, .jpeg, .webp"
             type="file" 
            />
             </label>
            <input 
             {...register('text')}
            type="text" 
            />
        { errors?.text  && (
                    <div className="autherror">
                    {errors.text && <div>{errors.text.message}</div>}
                  </div>
                )}
        
    <button type='submit'>go</button>
      
    </form>
  )
}

export default AvatarForm


