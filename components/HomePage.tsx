"use client"

import { Container } from '@radix-ui/themes'
import { Flex } from 'antd'

import React from 'react'

function HomePage() {
  return (
    <main className='grid gap-5 place-items-center h-[400px]'>
        <h1 className='text-bold text-3xl'>Leader Task reminder app</h1>
        <div className='w-[400px] text-xl '>
            LeaderTask reminds you of scheduled appointments and tasks. To-do lists, most important tasks and reminders so you don’t forget anything and have a productive day.
        </div>

  </main>
  )
}

export default HomePage
