import React, { useEffect, useState } from 'react'
import api from '../api'
import ListItems from '../components/ListItems'
import AddButton from '../components/AddButton'
const AllBooks = () => {
    const [books, setBooks] = useState([])
    const [fetchError, setFetchError] = useState('')

  

    useEffect(() => {
      const getBookNotes  =  async() => {
        try {
          const response = await api.get('/api/books/')
          const data = response.data
          console.log('data', data);
          setBooks(data)
        } catch (error) {
          setFetchError(error.message)
        }
      }
      getBookNotes()
    },[])
  
    
  
  return (
    <div className='container'>
    <div className='app'>
    <div className='books'>
      <div  className='books-header'>
        <h2 className='books-title'>&#9782; Books</h2>
        <p className='books-count'>{books.length}</p>
    </div>

    {fetchError && <p className='error'>{`Error : ${fetchError}`}</p>}

    <div className='books-list'>
    {books &&
            books.map((book, index) => {
                return (<ListItems book={book} key={index} />)
            })
        }
        </div> 
    </div>
    <AddButton/>

    </div>
    
    </div>
  )
}

export default AllBooks