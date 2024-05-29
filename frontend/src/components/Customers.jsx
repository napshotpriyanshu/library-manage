import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate} from 'react-router-dom';


function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomer] = useState([]);
  useEffect(()=>{
    fetchCustomer()
  },[])

  const fetchCustomer = async () =>{
    try {
      const response = await axios.get("http://127.0.0.1:5000/customer");
      console.log(response.data);
      setCustomer(response.data);
      
    } catch (error) {
      console.log(error);
      navigate("/")
    }
    
  }

  return (
    <div>
      <div>
        <h1>Customers</h1>
      </div>
      <div>
        <button>
        <NavLink
            exact
            to="/addcustomer"
            activeClassName="active"
          >Add New Customer
          </NavLink></button>
      </div>
      <div className='table-container'>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Registered On</th>
            <th>Outstanding Debt</th>
            <th>Amount Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index)=>(
          <tr>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.registered_on}</td>
            <td>{customer.outstanding_debt}</td>
            <td>{customer.amount_spent}</td>
            <td> <button>EDIT</button></td>
            <td><button>DELETE</button></td>
          </tr>
          ))}
        </tbody>
      </div>
    </div>
  )
}

export default Customers