import React, {useState, useEffect } from 'react'
import BackButton from  '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
 

export default function EditBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
    .then((res) => {
      setAuthor(res.data.author)
      setTitle(res.data.title)
      setPublishYear(res.data.publishYear)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      alert('Error occured, check console')
      setLoading(false)
    })
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        alert('An error occured, please check console')
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : ('')}
      <div className="flex flex-col border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-4'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-4'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-4'>Publish Year</label>
          <input 
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8 rounded' onClick={handleEditBook}>
          Edit Book
        </button>
      </div>
    </div>
  )
}
