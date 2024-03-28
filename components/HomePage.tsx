"use client"

import React from 'react'
import { H1Text, SText } from './Display'

function HomePage() {
  return (
    <main className='grid gap-5 place-items-center h-[400px]'>
        <H1Text
        // isLarger ={true}
         className='text-bold text-3xl'>
          Task Reminder 
          </H1Text>
        <div className='w-[300px] text-xl '>
            <SText 
            // isLarger ={true}
            >
              Advanced Next.js application  which reminds you of scheduled appointments and tasks, To-do lists, most important tasks and reminders so you don’t forget anything and have a productive day.</SText>
        </div>
    </main>
  )
}

export default HomePage
