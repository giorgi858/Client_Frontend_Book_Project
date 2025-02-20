import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
      <li><Link className='navList' to='/'>Home</Link></li>
      <li><Link className='navList' to='/about'>About Us</Link></li>
      <li><Link className='navList' to='/book'>All Books</Link></li>

      </ul>
      <ul>
        <li><Link className='navList' to='/login'>Login</Link></li>
        <li><Link className='navList' to='/register'>Register</Link></li>
        <li><Link className='navList' to='/logout'>Logout</Link></li>

        
      </ul>
    </nav>
  )
}

export default Navbar