import React from 'react';
import { Link } from "react-router-dom";
import styles from '../SignIn/SignIn.module.css';
import { newUser } from '../../apiCalls';
import { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return(
        <div className={styles.formcontainer}>
            <h2>Sign Up</h2>
            <form>
                <div className="form-control">
                    <input type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-control">
                    <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button onClick={() => newUser(username, password)}>Sign up</button>
            </form>
            <p> Already have an account? <Link to="/">Log In Here!</Link></p>
        </div>
    );
};

export default SignUp;