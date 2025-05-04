const newBookContainer = document.getElementById('new-book');
const sumbitDeleteButton = document.getElementById('submit-book-delete');

sumbitDeleteButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;

  fetch(`/api/books/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
        return response.json().then(data => {throw new Error(data.message)})
    }
    return response.json();
  })
  .then(() => {
    const newBook = document.createElement('div');
    newBook.innerHTML = `
    <h3>Your book was deleted!</h3>
    <p>Go to the <a href="book-api.html">home page</a> to request and view all book.</p>
    `
    newBookContainer.appendChild(newBook);
  })
  .catch(err => {
    const newBook = document.createElement('div');
    newBook.innerHTML = `
    <h3>Error: ${err.message}</h3>
    <p>Go to the <a href="book-api.html">home page</a> to request and view all book.</p>
    `;
    newBookContainer.appendChild(newBook);
  })
})