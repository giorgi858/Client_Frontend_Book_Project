import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
   
  return (
    <div className='home'>
      <h1>In this website you can write book notes</h1>
      <Link to='/book' className='homeLink'>
          <h1>go to books list</h1>
      </Link>
    </div>
  )
}

export default Home