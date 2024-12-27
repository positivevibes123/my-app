import React from 'react';
import { Link } from "react-router-dom"
import styles from './SignIn.module.css';

export default class Signin extends React.Component {
    render() {
        return(
            <div className={styles.formcontainer}>
                <h2>Login</h2>
                <form>
                    <div className="form-control">
                        <input type="text" placeholder="Enter username" />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Enter password" />
                    </div>

                    <button>Sign in</button>
                </form>
                <p> Don't have an account? <Link to="/SignUp">Sign Up Here!</Link></p>
            </div>
        );
    }
}