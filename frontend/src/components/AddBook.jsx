import React, { useState } from 'react'
import axios from 'axios';


function AddBook() {

    const [state, setState] = useState({
        id: '',
        title: '',
        author: '',
        average_rating: '',
        isbn: '',
        isbn13: '',
        total_quantity: '',

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

        const response = await axios.post("http://127.0.0.1:5000/create_book",formData,{
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
            id: '',
            title: '',
            author: '',
            average_rating: '',
            isbn: '',
            isbn13: '',
            total_quantity: '',

        });
    };

    return (
        <div className='formmain'>
            <div className="form-title"><h2>Add Book</h2></div>
            <div className="field1">
                <form action='' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='id'
                        placeholder='Enter ID'
                        onChange={handleChange}
                        value={state.id}
                    />
                    <input
                        type='text'
                        name='title'
                        placeholder='Enter title'
                        onChange={handleChange}
                        value={state.title}
                    />
                    <input
                        type='text'
                        name='author'
                        placeholder='Enter author'
                        onChange={handleChange}
                        value={state.author}
                    />
                    <input
                        type='text'
                        name='average_rating'
                        placeholder='Enter average rating'
                        onChange={handleChange}
                        value={state.average_rating}
                    />
                    <input
                        type='text'
                        name='isbn'
                        placeholder='Enter isbn'
                        onChange={handleChange}
                        value={state.isbn}
                    />
                    <input
                        type='text'
                        name='isbn13'
                        placeholder='Enter isbn13'
                        onChange={handleChange}
                        value={state.isbn13}
                    />

                    <input
                        type='text'
                        name='total_quantity'
                        placeholder='Enter total quantity'
                        onChange={handleChange}
                        value={state.total_quantity}
                    />

                    <button className="submitBtn" onClick={handleClick} >Add Book</button>
                </form>
            </div>
        </div>
    )
}

export default AddBook