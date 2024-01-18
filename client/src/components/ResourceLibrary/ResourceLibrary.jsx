import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Global/Header';

const BooksResourcePage = ({userName , userId}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 rounded-md shadow-md" style={{ overflow: "auto", height: "87vh" }}>
      <div className="mb-4 flex items-center" style={{textAlign:"center", padding:"5vh"}}>
        <h1>Resource Library</h1>
        <input
          type="text"
          placeholder="Search books [name, author, topic]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-md"
          style={{backgroundColor:"white", width:"40vw"}}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2"
          
          style={{backgroundColor:"green", height:"2.5rem", color:"white", width:"12vw"}}
        >
          Search
        </button>
      </div>
      <div className="flex">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col p-4 rounded-md shadow-md">
          <div className="flex flex-row" style={{ display: "flex"}}>
  <div className="mr-4">
    <img
      src={book.volumeInfo.imageLinks?.thumbnail || 'No image available'}
      alt={book.volumeInfo.title}
      className="w-8rem h-12rem object-cover mb-4"
      style={{ width: '10rem', height: '12rem', borderRadius: '0.5rem' }}
    />
  </div>
  <div className="" style={{ maxWidth: '80rem',marginLeft:"10vw"}}>
    <h3 className="text-lg font-semibold mb-2">{book.volumeInfo.title}</h3>
    <div className="text-sm mb-2" style={{ width: '53rem', textAlign:"justify" }}>
      {book.volumeInfo.description
        ? book.volumeInfo.description.substring(0, 1000) + '...'
        : 'No description available'}
    </div>
    <a
  href={book.volumeInfo.infoLink}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-500"
  style={{ backgroundColor: "green", textDecoration: "none", height: "4vh", color: "white", width: "50px", padding:"3px" }}
>
  View on Google Books
</a>
  </div>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksResourcePage;