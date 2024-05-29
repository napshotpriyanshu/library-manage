import React, { useState } from 'react'
import axios from 'axios';


function AddCustomer() {

    const [state, setState] = useState({
        name: '',
        email: '',

    })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const handleClick= async(event)=>{

        const formData = new FormData();
        for (const key in state) {
            formData.append(key, state[key]);
        }

        const response = await axios.post("http://127.0.0.1:5000/add_customer",formData,{
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
            name: '',
            email: '',

        });
    };

    return (
        <div className='formmain'>
            <div className="form-title"><h2>Add Customer</h2></div>
            <div className="field1">
                <form action='' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter name'
                        onChange={handleChange}
                        value={state.id}
                    />
                    <input
                        type='text'
                        name='email'
                        placeholder='Enter email'
                        onChange={handleChange}
                        value={state.title}
                    />

                    <button className="submitBtn" onClick={handleClick} >Add Book</button>
                </form>
            </div>
        </div>
    )
}

export default AddCustomer