const newBookContainer = document.getElementById('new-book');
const sumbitEditButton = document.getElementById('submit-book-edit');

sumbitEditButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;
  const book = document.getElementById('book').value;
  const author = document.getElementById('author').value;
  const date = document.getElementById('date').value;

  fetch(`/api/books/${id}?book=${book}&author=${author}&date=${date}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(({book}) => {
    const newBook = document.createElement('div');
    newBook.innerHTML = `
    <h3>Congrats, your book was edited!</h3>
    <div class="book-text">${book.book}</div>
    <div class="attribution">- ${book.author}</div>
    <div class="date">Added on: ${new Date(book.date).toLocaleDateString()}</div>
    <p>Go to the <a href="book-api.html">home page</a> to request and view all books.</p>
    `
    newBookContainer.appendChild(newBook);
  })
})