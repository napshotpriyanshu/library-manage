import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


function ReturnBook() {
    
    const navigate = useNavigate();

    const location = useLocation();
    const { id,borrowed_on } = location.state || {};
    

    const [rentedDays, setRentedDays] = useState(0);
  const [amountDue, setAmountDue] = useState(0);

  useEffect(()=>{
    fetchReturn()
  },[])

  const fetchReturn = async () =>{
    try {
      const response = await axios.get(`http://127.0.0.1:5000/return_book/${id}`);
      setRentedDays(response.data[0]);
      setAmountDue(response.data[1]);
      
    } catch (error) {
      console.log(error);
    }
  }

   
    if (!id) {
        return <div>No id data</div>;
    }

    const [state, setState] = useState({
        amount_paid: '',

    })
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        
        const formData = new FormData();
        for (const key in state) {
            formData.append(key, state[key]);
        }

        const response = await axios.post(`http://127.0.0.1:5000/return_book/${id}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);

        setState({
            amount_paid: '',
        });
    };

  return (
    <div>
        <div><h2>Return Book</h2></div>
        <div>
        <p>Transaction ID: {id}</p>
        <p>Borrowed On : {borrowed_on}</p>
        <p>rented_days : {rentedDays}</p>
        <p>amount_due : {amountDue}</p>
        </div>
        <div>
            <form  onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='amount_paid'
                    placeholder='Enter amount paid'
                    onChange={handleChange}
                    value={state.amount_paid}
                />
                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ReturnBook