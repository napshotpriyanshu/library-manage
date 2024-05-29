import React, { useState } from 'react'
import axios from 'axios';


function IssueBook() {

    const [state, setState] = useState({
        book_id: '',
        customer_id: '',
        per_day_fee: '',
    })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const handleClick = async (event) => {

        const formData = new FormData();
        for (const key in state) {
            formData.append(key, state[key]);
        }

        const response = await axios.post("http://127.0.0.1:5000/book_issue", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(state);


        setState({
            book_id: '',
            customer_id: '',
            per_day_fee: '',

        });
    };
    return (
        <div className='formmain'>
            <div className="form-title"><h2>Issue Book</h2></div>
            <div className="field1">
                <form action='' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='book_id'
                        placeholder='Enter Book ID'
                        onChange={handleChange}
                        value={state.book_id}
                    />
                    <input
                        type='text'
                        name='customer_id'
                        placeholder='Enter customer id'
                        onChange={handleChange}
                        value={state.customer_id}
                    />

                    <input
                        type='text'
                        name='per_day_fee'
                        placeholder='Enter per day fee'
                        onChange={handleChange}
                        value={state.per_day_fee}
                    />

                    <button className="submitBtn" onClick={handleClick} >Add Book</button>
                </form>
            </div>
        </div>
    )
}

export default IssueBook