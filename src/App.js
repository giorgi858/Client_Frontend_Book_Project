import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import AllBooks from './pages/AllBooks'
import SingleBook from './pages/SingleBook'
import Login from './LoginAndRegister/Login'
import Register from './LoginAndRegister/Register'
import AboutPage from './pages/AboutPage'

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/book' element={<AllBooks/>} />
          <Route path='/book/:id' element={<SingleBook/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
  )
}

export default App