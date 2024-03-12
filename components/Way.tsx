import Link from 'next/link'
import React from 'react'

function Way() {
  return (
    <Link href='/dashboard'>
      <h1 className='text-xl font-bold bg-gradient-to-r from-cyan-500 to-yellow-500 bg-clip-text text-transparent'>My Tasks</h1>
    </Link>
  )
}

export default Way