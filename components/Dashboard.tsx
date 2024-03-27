import Link from 'next/link'
import React from 'react'

function Dashboard() {
  return (
    <Link href='/dashboard'>
      <h1 className='text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>
        Tasks</h1>
    </Link>
  )
}

export default Dashboard