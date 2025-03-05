import React, { useState, useEffect } from 'react'
import {ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'


const SingleBook = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const navigate = useNavigate()



  useEffect(() => {
    const getSingleBook  =  async() => {
      try {
        if (id === 'new') return
        const response = await api.get(`/api/books/${id}/`)
        const data = response.data
        console.log('data GET single', data);
        setBook(data)
      } catch (error) {
        setFetchError(error.message)
      }
    }
    getSingleBook()
  },[id])


  const createBook = async() => {
   try {
      const response = await api.post(`/api/books/`,{content: book.content  })
      console.log('response POST', response);
      navigate('/book')
   } catch (error) {
      setFetchError(error.message)
   }
   }
  
   const updataBook = async() => {
   try {
   const response = await api.put(`/api/books/${id}/`,{
    content: book.content  
   })
   console.log('response PUT', response.data);
   } catch (error) {
    setFetchError(error.message)
   }
   }
  
  
  
  const deleteBook = async() => {
    try {
     const response = await api.delete(`/api/books/${id}/`)
     console.log("DELETE book", response);
    } catch (error) {
      setFetchError(error.message)
    }
    navigate('/book')
    }
  
    let handleSubmit = () => {
      console.log('book', book);
      if (id !== 'new' && book.content === '') {
          deleteBook()
      } else if (id !== 'new') {
          updataBook()
      } else if (id === 'new' && book?.content!== null) {
          createBook()
      }
      navigate('/book')

  }

  const handleChange = (value) => {
    setBook(book => ({ ...book, 'content': value }))
    console.log('Handle Change:', book)  
  }
 

  return (
    <div className='container'>
    <div className='app'>
    <div className='book'>

<div className='book-header'>
    {book === null ? <a href='/book'>Go Home</a>:
    <h3>
       <ArrowLeft onClick={handleSubmit} />

  </h3>}
    {id !== 'new' ? (
      <button onClick={deleteBook}>Delete</button>
    ): (
      <button onClick={handleSubmit}>Done</button>
    )}
</div>

{fetchError && <p className='error'>{`Error : ${fetchError}`}</p>}

<textarea onChange={(e) => { handleChange(e.target.value) }} value={book?.content}></textarea>

</div>
    </div>
    </div>
  )
}

export default SingleBook