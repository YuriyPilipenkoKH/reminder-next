import Link from 'next/link'
import React from 'react'
import ReminderLogo from './icons/ReminderLogo'

function Logo() {
  return (
    <Link href='/'>
      {/* <h1 className='text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>Reminder</h1> */}
      <ReminderLogo />
    </Link>
  )
}

export default Logo