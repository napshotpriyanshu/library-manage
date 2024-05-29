import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import ReturnBook from './ReturnBook';

function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
    
  useEffect(()=>{
    fetchTransactions()
  },[])

  const fetchTransactions = async () =>{
    try {
      const response = await axios.get("http://127.0.0.1:5000/transactions");
      console.log(response.data);
      setTransactions(response.data);
      
    } catch (error) {
      console.log(error);
      navigate("/")
    }
    
  }
  const handleClick = (item) => {
      navigate('/returnbook', {state:{id:item.id, borrowed_on:item.borrowed_on}});
  };

  return (
    <div>
      <div>
        <h1>Transactions</h1>
      </div>
      <div>
        <button><NavLink
            exact
            to="/issuebook"
            activeClassName="active"
          >
            Issue Book
          </NavLink>
          </button>
      </div>
      <div className='table-container'>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Book ID</th>
            <th>Customer ID</th>
            <th>Per Day Renting Fee</th>
            <th>Borrowed On</th>
            <th>Returned On</th>
            <th>Total Charger</th>
            <th>Amount Paid</th>
            <th>Status = Open Closed</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index)=>(
          <tr>
            <td>{transaction.id}</td>
            <td>{transaction.book_id}</td>
            <td>{transaction.customer_id}</td>
            <td>{transaction.per_day_fee}</td>
            <td>{transaction.borrowed_on}</td>
            <td>{transaction.returned_on}</td>
            <td>{transaction.total_charge}</td>
            <td>{transaction.amount_paid}</td>
            <td>
              {transaction.amount_paid=='-' ? <button onClick={() => handleClick(transaction)}>Open</button>: <h3>Closed</h3>}
            </td>
          </tr>

          ))}
        </tbody>
      </div>
    </div>
  )
}

export default Transactions