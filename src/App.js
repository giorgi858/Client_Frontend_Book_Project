import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import AllBooks from './pages/AllBooks'
import SingleBook from './pages/SingleBook'
import Login from './LoginAndRegister/Login'
import Register from './LoginAndRegister/Register'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './components/ProtectedRoute'


const Logout = () => {
  localStorage.clear()
  return <Navigate to='/book'/>
}
const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register />
}


const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/book' element={
            <ProtectedRoute>
              <AllBooks/>
            </ProtectedRoute>
          } />
          <Route path='/book/:id' element={
          <ProtectedRoute>
            <SingleBook/>
          </ProtectedRoute>
          } />
          <Route path='/register' element={<RegisterAndLogout/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
  )
}

export default App