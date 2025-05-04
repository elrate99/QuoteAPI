const newQuoteContainer = document.getElementById('new-quote');
const sumbitDeleteButton = document.getElementById('submit-quote-delete');

sumbitDeleteButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;

  fetch(`/api/quotes/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
        return response.json().then(data => {throw new Error(data.message)})
    }
    return response.json();
  })
  .then(() => {
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
    <h3>Your quote was deleted!</h3>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newQuoteContainer.appendChild(newQuote);
  })
  .catch(err => {
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
    <h3>Error: ${err.message}</h3>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
    newQuoteContainer.appendChild(newQuote);
  })
})