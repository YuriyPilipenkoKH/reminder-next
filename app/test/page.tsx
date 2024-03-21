"use client"
import AvatarForm from '@/components/Forms/AvatarForm'
import React, { useState } from 'react'

function TestPage() {
    const [editPhoto, setEditPhoto] = useState(false)
  return (
    <div>
      <AvatarForm editPhoto={true}/>
    </div>
  )
}

export default TestPage
