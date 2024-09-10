import React from 'react'
import { Link } from 'react-router-dom'

function MiniNavBar() {
  return (
    <div className='bg-white text-[#1974A6] flex gap-4 text-xl font-semibold'>
        <div>

        <Link to='home'>Home</Link>
        </div>
        <Link to='register'>New Application</Link>
        <Link>Scheme</Link>
        <Link>PayOut</Link>
        <Link>Bank</Link>
        <Link>Signout</Link>

        
      
    </div>
  )
}

export default MiniNavBar
