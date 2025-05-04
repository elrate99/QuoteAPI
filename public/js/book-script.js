const fetchAllButton = document.getElementById('fetch-books');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');
const fetchByIdButton = document.getElementById('fetch-by-id');

const bookContainer = document.getElementById('book-container');
const bookText = document.querySelector('.book');
const attributionText = document.querySelector('.attribution');

const resetBooks = () => {
  bookContainer.innerHTML = '';
}

const renderError = response => {
    bookContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderBooks = (books = []) => {
  resetBooks();
  if (books.length > 0) {
    books.forEach(book => {
      const newBook = document.createElement('div');
      newBook.className = 'single-book';
      newBook.innerHTML = `<div class="book-text">${book.book}</div>
      <div class="attribution">- ${book.author}</div>
      <div class="attribution">- ${book.id}</div>
      <div class="date">Added on: ${new Date(book.date).toLocaleDateString()}</div>`;
      bookContainer.appendChild(newBook);
    });
  } else {
    bookContainer.innerHTML = '<p>Your request returned no books.</p>';
  }
}

fetchByIdButton.addEventListener('click', () => {
  const id = document.getElementById('author').value;
  if (!id) {
    // id пустой → показываем ошибку
    bookContainer.innerHTML = '<p>Please enter an ID before searching.</p>';
    return;
  }
  fetch(`/api/books/${id}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderBooks(response.books);
  })
})

fetchAllButton.addEventListener('click', () => {
  fetch('/api/books')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderBooks(response.books);
  });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/books/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderBooks([response.book]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetch(`/api/books?author=${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderBooks(response.books);
  });
});
