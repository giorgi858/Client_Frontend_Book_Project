import React, { useState, useEffect } from 'react'
import {ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
        console.log('data', data);
        setBook(data)
      } catch (error) {
        setFetchError(error.message)
      }
    }
    getSingleBook()
  },[id])


  const createBook = async() => {
    fetch(`/api/books/`,{
      method: "POST",
      "headers": {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(book)
   })
   }
  
   const updataBook = async() => {
    fetch(`/api/books/${id}/`,{
      method: "PUT",
      "headers": {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(book)
   })
   }
  
  
  
  const deleteBook = async() => {
     fetch(`/api/books/${id}/`,{
      method: "DELETE",
      "headers": {
        'Content-Type': 'application/json'
      },
    })
    navigate('/book')
    }
  
    let handleSubmit = () => {
      console.log('book', book);
      if (id !== 'new' && book.content == '') {
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
    {book === null ? <Link to='/book'>Go Home</Link>:
    <h3>
    <ArrowLeft onClick={handleSubmit}/>
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