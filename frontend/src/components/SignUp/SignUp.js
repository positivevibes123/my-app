import React from 'react';
import { Link } from "react-router-dom"
import styles from '../SignIn/SignIn.module.css';

export default class SignUp extends React.Component {
    render() {
        return(
            <div className={styles.formcontainer}>
                <h2>Sign Up</h2>
                <form>
                    <div className="form-control">
                        <input type="text" placeholder="Enter username" />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Enter password" />
                    </div>

                    <button>Sign in</button>
                </form>
                <p> Already have an account? <Link to="/">Log In Here!</Link></p>
            </div>
        );
    }
}