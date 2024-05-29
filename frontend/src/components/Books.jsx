import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/booklist");
      console.log(response.data);
      setBooks(response.data);

    } catch (error) {
      console.log(error);
      navigate("/")
    }

  }


  return (
    <div>
      <div>
        <h1>Books</h1>
      </div>
      <div>
        <button>
          <NavLink
            exact
            to="/addbook"
            activeClassName="active"
          >Add New Book
          </NavLink>
        </button>
      </div>
      <div className='table-container'>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Total No. of Books</th>
            <th>Books Available to Rent</th>
            <th>Rented Count</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.total_quantity}</td>
              <td>{book.available_quantity}</td>
              <td>{book.rented_count}</td>
              <td> <button>EDIT</button></td>
              <td><button>DELETE</button></td>
            </tr>
          ))}

        </tbody>
      </div>
    </div>
  )
}

export default Books