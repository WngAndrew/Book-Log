import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

//gets all books in db
router.get('/', async (req,res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json(
            {
                count:books.length,
                data: books
            }
        )
    } catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//get single book from db by id
router.get('/:id', async (req,res) => {
    try {

        const { id } = req.params

        const book = await Book.findById(id)
        return res.status(200).send(book)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//update a book in the db
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({message: 'Send all required fields (title, author, publish year'})
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!res) {
            return res.status(404).send({message:'page not found'})
        } 
        return res.status(200).send( {message: 'book updated succesfully'})
    } catch(error) {
        res.status(500).send({message: error.message})
    }
})

//add a book to the db
router.post('/', async (req,res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({message : 'Send all required fields (title, author, publish year)'})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)

        return res.status(201).send(book)

    } catch(error) {
        console.log(error.message)
        res.status(500).send({message : error.message})
    }
})

//route for deleting a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).send({message: 'book not found'})
        }
        return res.status(200).send({message:'book deleted succesfully'})

    } catch(error) {
        res.status(500).send({message: error.message})
    }
})

export default router