import { createProfileSchema, createProfileSchemaType } from '@/models/schema/profileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import UserContext, { UserContextType } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form'

interface ProfileFormProps {
  anable: boolean
  }

const ProfileForm: React.FC<ProfileFormProps> = ({ anable }) => {
  const [logError, setLogError] = useState('')
  const {user,  setReRender} = useContext(UserContext as React.Context<UserContextType>)
  

    const {
        register, 
        handleSubmit,
        formState,
        reset,
        watch
    } = useForm<createProfileSchemaType>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: '',
            company: '',
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
      reset()
  }


  return (
    <form 
    className='profile_form'
    onSubmit={handleSubmit(onSubmit)} 
    autoComplete="off"
    noValidate>
    <label 
    className='profile_label'>name
      <input
      {...register('name')}
      className='profile_input'
      disabled= {!anable}
       type="text" />
    </label>
    <label 
    className='profile_label'>email
      <input 
      {...register('email')}
      className='profile_input'
      disabled= {!anable}
      type="text" />
    </label>
    <label 
    className='profile_label'>phone
      <input
      {...register('phone')}
      className='profile_input'
      disabled= {!anable}
       type="text" />
    </label>
    <label 
    className='profile_label'>company
      <input 
      {...register('company')}
      className='profile_input'
      disabled= {!anable}
      type="text" />
    </label>
    <label 
    className='profile_label'>location
      <input 
      {...register('location')}
      className='profile_input'
      disabled= {!anable}
      type="text" />
    </label>
    {(errors?.name || errors?.email || errors?.phone || errors?.company || errors?.location )&& (
              <div className="autherror">
                {errors.name && <div>{errors.name.message}</div>}
                {!errors.name && errors.email && <div>{errors.email.message}</div>}
                {!errors.name && !errors.email && errors.phone && <div>{errors.phone.message}</div>}
                {!errors.name && !errors.email && errors.phone && errors.company &&<div>{errors.company.message}</div>}
                {!errors.name && !errors.email && errors.phone && errors.company && errors.location &&<div>{errors.location.message}</div>}
              </div>
            )}
            {logError && <div className="autherror">{"Incorrect some fiellds"}</div>}
    {anable && (
        <button 
        className='save'
        disabled={isSubmitting || !isDirty || !isValid}
        type='submit'>Save</button>
    )}        
  </form>
  )
}

export default ProfileForm
