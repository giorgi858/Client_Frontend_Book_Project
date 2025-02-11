import React from 'react'

const Login = () => {
    const handlesubmit = (e) => {
        e.preventDefault()
        console.log('hi');
    }
  return (
    <form className='login' onSubmit={handlesubmit}>
        <label htmlFor='username'>login</label>
        <input 
            id='username'
            type='text'
            placeholder='login'
        />
        <label htmlFor='password'>password</label>
        <input 
            id='password'
            type='passord'
            placeholder='password'
        />
        <button>Login in</button>
    </form>
  )
}

export default Login