import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Books from './Books'
function Navbar() {
    return (

        <div className='navbar'>

            <div class="Nav-container">
                <div className='nav-logo'>
                    <NavLink
                        exact
                        to="/"
                        activeClassName="active"
                    >
                        Library Manager
                    </NavLink>
                </div>

                <div className='nav-elements'>
                    <ul >
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/books"
                                activeClassName="active"
                            >
                                Books
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/customers"
                                activeClassName="active"
                            >
                                Customer
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/transactions"
                                activeClassName="active"
                            >
                                Transaction
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Navbar