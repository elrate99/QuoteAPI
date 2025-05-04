const express = require('express');
const app = express();
const booksRouter = express.Router();
let idCounter = 5;

const { books } = require('./data');
const { getRandomElement } = require('./utils');

booksRouter.get('/random', (req, res, next) => {
    const randomBook = getRandomElement(books);
    if (randomBook) {
      res.send({book: randomBook});
    } else {
      res.status(404).send();
    }
  })
  
  booksRouter.get('/', (req, res, next) => {
    const author = req.query.author;
    if (author) {
      const result = books.filter(elem => elem.author === author);
      res.send({books: result})
    } else {
      res.send({books})
    }
  })
  booksRouter.get('/:id', (req, res, next) => {
      const id = Number(req.params.id);
      const result = books.find(elem => elem.id === id)
      if(result) {
          res.send({books: [result]});
      } else {
          res.status(404).send({ message: 'Book not found.'})
      }
    })
  
  booksRouter.post('/', (req, res, next) => {
    const request = req.query;
    request.id = idCounter++;
    if (req.query.book && req.query.author) {
      books.push(request);
      res.status(201).send({book: request});;
    } else {
      res.status(400).send()
    }
  })
  
  booksRouter.put('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const request = req.query;
    if (request.book && request.author) {
      let result = books.find(elem => elem.id === id);
      result.book = request.book;
      result.author = request.author;
      result.date = request.date;
      res.send({book: result});
    } else if (request.book) {
      let result = books.find(elem => elem.id === id);
      result.book = request.book;
      res.send({book: result});
    } else if (request.author) {
      let result = books.find(elem => elem.id === id);
      result.author = request.author;
      res.send({book: result});
    } else if (request.date) {
      let result = books.find(elem => elem.id === id);
      result.date = request.date;
      res.send({book: result});
    }
  })
  
  booksRouter.delete('/:id', (req, res, next) => {
      const id = Number(req.params.id);
      const index = books.findIndex(elem => elem.id === id);
      if (index !== -1) {
          books.splice(index, 1);
          res.status(200).send({message: 'Content was deleted!'})
      } else {
          res.status(404).send({message: 'Quote not found!'})
      }
  })


module.exports = booksRouter;
