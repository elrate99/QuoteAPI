const express = require('express');
const app = express();
let idCounter = 14;

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const quotesRouter = express.Router()
app.use('/api/quotes', quotesRouter)
app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT} port`);
})

quotesRouter.get('/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  const obj = {
    quote: randomQuote
  }
  if (randomQuote) {
    res.send(obj);
  } else {
    res.status(404).send();
  }
})

quotesRouter.get('/', (req, res, next) => {
  const person = req.query.person;
  if (person) {
    const result = quotes.filter(elem => elem.person === person);
    res.send({quotes: result})
  } else {
    res.send({quotes})
  }
})
quotesRouter.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const result = quotes.find(elem => elem.id === id)
    if(result) {
        res.send({quotes: [result]});
    } else if (!id) {
        res.status(404).send({ message: 'Quote not found.'})
    }
  })

quotesRouter.post('/', (req, res, next) => {
  const request = req.query;
  request.id = idCounter++;
  if (req.query.quote && req.query.person) {
    quotes.push(request);
    res.status(201).send({quote: request});
  } else {
    res.status(400).send()
  }
})

quotesRouter.put('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const request = req.query;
  if (request.quote && request.person) {
    let result = quotes.find(elem => elem.id === id);
    result.quote = request.quote;
    result.person = request.person;
    result.date = request.date;
    res.send({quote: result});
  } else if (request.quote) {
    let result = quotes.find(elem => elem.id === id);
    result.quote = request.quote;
    res.send({quote: result});
  } else if (request.person) {
    let result = quotes.find(elem => elem.id === id);
    result.person = request.person;
    res.send({quote: result});
  } else if (request.date) {
    let result = quotes.find(elem => elem.id === id);
    result.date = request.date;
    res.send({quote: result});
  }
})

quotesRouter.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const index = quotes.findIndex(elem => elem.id === id);
    if (index !== -1) {
        quotes.splice(index, 1);
        res.status(200).send({message: 'Content was deleted!'})
    } else {
        res.status(404).send({message: 'Quote not found!'})
    }
})