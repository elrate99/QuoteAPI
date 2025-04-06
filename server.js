const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
const quotesRouter = express.Router();

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {console.log(`Server is listening on ${PORT}`)})




app.use('/api/quotes', quotesRouter)

quotesRouter.get('/random', (req, res, next) => {
    const random = getRandomElement(quotes);
    res.send({quote: random})
})

quotesRouter.get('/', (req, res, next) => {
    const filteredQuotes = quotes.filter(person => person.person === req.query.person);
    if(req.query.person) {
        res.send({quotes: filteredQuotes})
    } else {
        res.send({quotes: quotes})
    }
})

quotesRouter.post('/', (req, res, next) => {
    const quote = req.query.quote;
    const person = req.query.person;
    if(quote && person) {
        quotes.push({ quote: quote, person: person });
        res.send({ quote: { quote: quote, person: person } });
    } else {
        res.status(400).send()
    }
})