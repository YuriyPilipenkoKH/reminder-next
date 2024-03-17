
import { createProfileSchema, createProfileSchemaType } from '@/models/schema/profileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

function ProfileForm() {

    const {
        register, 
        handleSubmit,
        formState,
        reset,
        watch
    } = useForm<createProfileSchemaType>({
        defaultValues: {
            name: '',
            email: '',
            birthday: '',
            phone: '',
            location: '',
        },
        mode:'all',
        resolver: zodResolver(createProfileSchema),
    })
    const {
        errors,
        isDirty,
        isValid ,
        isSubmitting,
        isLoading,
    } = formState

    const onSubmit =async (data: createProfileSchemaType) => {
      
      console.log('onSubmit',data)

  }


  return (
    <form 
    onSubmit={handleSubmit(onSubmit)} 
    autoComplete="off"
    noValidate>
    <label >name
      <input
       type="text" />
    </label>
    <label >email
      <input 
      {...register('email')}
      type="text" />
    </label>
    <label >birthday
      <input 
      {...register('birthday')}
      type="text" />
    </label>
    <label >phone
      <input
      {...register('phone')}
       type="text" />
    </label>
    <label >location
      <input 
      {...register('location')}
      type="text" />
    </label>
    <button 
    type='submit'>save</button>
  </form>
  )
}

export default ProfileForm
