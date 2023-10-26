import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

function LoginPages() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform authentication here with username and password
        // For simplicity, we'll just log the values to the console.
        const userData = { username, password };
        console.log(userData)
        localStorage.setItem("username", userData.username)
        history.replace('/universitas')
        if(!userData.username && !userData.password) {
            setErrorMsg("Login failed. Please check your email and password.");
        }
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login Form</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail" className="form-group">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            name="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="form-group">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type={showPassword ? 'text' : 'password'} // Show/hide password
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="off"
                        />
                        <FaEye
                            className="append-icon"
                            onClick={togglePasswordVisibility}
                        />
                        { showPassword ? <FaEye className="append-icon"  onClick={togglePasswordVisibility} /> : <FaEyeSlash  className="append-icon"  onClick={togglePasswordVisibility}/> }
                    </Form.Group>
                    {
                        errorMsg && (
                            <div className="error-message">
                                {errorMsg}
                            </div>
                        )
                    }

                    <Button variant="outline-light" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginPages;