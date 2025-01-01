import React from 'react';
import { Link } from "react-router-dom";
import styles from './SignIn.module.css';
import { useState } from 'react';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className={styles.formcontainer}>
            <h2>Login</h2>
            <form>
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