import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const json = await response.json()
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials")
      } else {
        // Handle successful signup
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="userEmail"
              name='email'
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
              autoComplete="email"
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="mb-3">
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              name='password'
              value={credentials.password}
              onChange={onChange}
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-success">Sign Up</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
  )
}

