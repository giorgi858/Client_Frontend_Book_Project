import React from 'react'
import { Link } from 'react-router-dom'
import useIsAuthorized from '../hooks/useIsAuthorized'

const Navbar = () => {

  const {isAuthorized } =useIsAuthorized()

  console.log('isAuthorized', isAuthorized);

  return (
    <nav>
      <ul>
      <li><Link className='navList' to='/'>Home</Link></li>
      <li><Link className='navList' to='/about'>About Us</Link></li>
      <li><Link className='navList' to='/book'>All Books</Link></li>

      </ul>
      <ul>
        {!isAuthorized ?
        <>
          <li><Link to='/login' className='navList'>Login</Link></li>
          <li><Link to='/register' className='navList'>Register</Link></li>
        </>
        :
          <li><Link to='/logout' className='navList'>Logout</Link></li>
}
      </ul>
    </nav>
  )
}

export default Navbar