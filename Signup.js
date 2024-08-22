import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, geolocation: credentials.geolocation })
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
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name='name'
                        value={credentials.name}
                        onChange={onChange}
                        autoComplete="name"
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="userGeolocation">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userGeolocation"
                        name='geolocation'
                        value={credentials.geolocation}
                        onChange={onChange}
                        placeholder="Enter location"
                        autoComplete="street-address"
                    />
                </div>
                <button type="submit" className="btn btn-success">Sign Up</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    )
}



