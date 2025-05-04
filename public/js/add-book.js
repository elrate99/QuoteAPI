const submitButton = document.getElementById('submit-book');
const newBookContainer = document.getElementById('new-book');

submitButton.addEventListener('click', () => {
    const book = document.getElementById('book').value;
    const author = document.getElementById('author').value;
    const date = document.getElementById('date').value;
  
    fetch(`/api/books?book=${book}&author=${author}&date=${date}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(({book}) => {
      const newBook = document.createElement('div');
      newBook.innerHTML = `
      <h3>Congrats, your book was added!</h3>
      <div class="book-text">${book.book}</div>
      <div class="attribution">- ${book.author}</div>
      <div class="date">Added on: ${new Date(book.date).toLocaleDateString()}</div>
      <p>Go to the <a href="book-api.html">home page</a> to request and view all books.</p>
      `
      newBookContainer.appendChild(newBook);
    });
  });
  