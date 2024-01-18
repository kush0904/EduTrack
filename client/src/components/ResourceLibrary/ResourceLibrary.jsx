import React, { useState, useEffect } from 'react';

const BooksResourcePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Replace 'https://openlibrary.org/subjects/business.json' with the actual API endpoint
    fetch('https://openlibrary.org/subjects/business.json')
      .then((response) => response.json())
      .then((data) => setBooks(data.works))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to Our Books Resource Page</h1>
      <h2>Explore our curated collection of recommended books. Happy reading!</h2>

      {books.map((book, index) => (
        <section key={index}>
          <h2>{book.title}</h2>
          <ul>
            <li>
              <strong>{book.title}:</strong>{' '}
              <a href={`https://openlibrary.org${book.key}`}>{`https://openlibrary.org${book.key}`}</a>
              <p>
                <strong>Author:</strong> {book.authors ? book.authors[0].name : 'Unknown'} <br />
                Brief summary of the book and why it's recommended.
              </p>
              {book.cover_i && (
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={`${book.title} Cover`} />
              )}
            </li>
          </ul>
        </section>
      ))}
    </div>
  );
};

export default BooksResourcePage;
