import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from '../SignIn/SignIn.module.css';
import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    // Call on backend to add new user to users table, and go to log in page.
    const newUser = async (username, password) => {
        try {
            const res = await axios.post("http://localhost:3001/new-user", {username, password}).then(navigate("/"));
            //navigate("/");
            return res.data;
        } catch (err) {
            console.log("There was a problem adding a user to database (on frontend).")
            throw err;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        newUser(username, password);
    };
    
    return(
        <div className={styles.formcontainer}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <input type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-control">
                    <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit">Sign up</button>
            </form>
            <p> Already have an account? <Link to="/">Log In Here!</Link></p>
        </div>
    );
};

export default SignUp;