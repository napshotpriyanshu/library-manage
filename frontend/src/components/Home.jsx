import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to Library Manager</h1>
      </div>
      <div>
        <button>
          <NavLink
            exact
            to="/books"
            activeClassName="active"
          >
            Books
          </NavLink>
        </button>
        <button>
          <NavLink
            exact
            to="/customers"
            activeClassName="active"
          >
            Customer
          </NavLink>
        </button>
        <button>
          <NavLink
            exact
            to="/transactions"
            activeClassName="active"
          >
            Transactions
          </NavLink>
        </button>
      </div>
    </div>
  )
}

export default Home