import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './SignIn.module.css';
import { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const getUser = async (username, password) => {
        try {
            const res = await axios.post("http://localhost:3001/login", {username, password}).then(navigate("/Notes"));
            return res.data;
        } catch (err) {
            console.log("There was a problem finding this user in the database.")
            throw err;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getUser(username, password);
    };

    return(
        <div className={styles.formcontainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <input type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-control">
                    <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button>Sign in</button>
            </form>
            <p> Don't have an account? <Link to="/SignUp">Sign Up Here!</Link></p>
        </div>
    );
};

export default SignIn;