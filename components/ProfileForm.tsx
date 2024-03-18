import { createProfileSchema, createProfileSchemaType } from '@/models/schema/profileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import UserContext, { UserContextType } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import User from '@/models/UserTypes';

interface ProfileFormProps {
  user: User
  anable: boolean
  }

const ProfileForm: React.FC<ProfileFormProps> = ({ anable, user }) => {
  const [logError, setLogError] = useState('')
  const { setReRender, reRender} = useContext(UserContext as React.Context<UserContextType>)
  const router = useRouter()

    const {
        register, 
        handleSubmit,
        formState,
        reset,
        watch
    } = useForm<createProfileSchemaType>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            company: user?.company || '',
            location: user?.location || '',
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
      try {
        const response = await axios.patch("/api/users/updateprofile", {
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            company: data?.company,
            location: data?.location,
            userId: user._id,
        })
        .then(response => {
          // Assuming response.data.user contains updated user data
          const updatedUserData = response.data.user;
          
          // Reset the form with updated user data
          reset({
              name: updatedUserData.name,
              email: updatedUserData.email,
              phone: updatedUserData.phone,
              company: updatedUserData.company,
              location: updatedUserData.location,
          });
  
          toast.success(`User Info updated`);
          setReRender(!reRender);
          // router.refresh();
        });

    }
     catch (error:any) {
        console.log("Updatin failed",error)
        // setLogError(error?.response.data.error)
        toast.error(error.message)
     }

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
                {!errors.name && !errors.email && !errors.phone && errors.company &&<div>{errors.company.message}</div>}
                {!errors.name && !errors.email && !errors.phone && !errors.company && errors.location &&<div>{errors.location.message}</div>}
              </div>
            )}
            {logError && <div className="autherror">{"Incorrect some fiellds"}</div>}
            {/* {user && <div className='absolute top-6'>{user?.name}</div>} */}
    {anable && (
        <button 
        className='save'
        disabled={isSubmitting || !isDirty || !isValid}
        type='submit'>
          {(isLoading || isSubmitting) ? "Process" : "Save"}
          </button>
    )}        
  </form>
  )
}

export default ProfileForm
