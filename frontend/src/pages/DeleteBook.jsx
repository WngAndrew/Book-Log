import React, {useState} from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function DeleteBook() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        alert('error occured, check console')
        navigate('/')
      })
  }

  return (
    <div>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3>Are you sure you want to delete this book?</h3>
          <button 
            className='p-4 bg-red-600 text-white m-8 w-full'
            onClick={handleDeleteBook}  
          >
            Delete Book
          </button>
        </div>
      )}
    </div>
  )
}
