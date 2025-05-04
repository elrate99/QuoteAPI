const express = require('express');
const app = express();


const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const quotesRouter = require('./quotes');
const booksRouter = require('./books');
app.use('/api/quotes', quotesRouter);
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT} port`);
})

