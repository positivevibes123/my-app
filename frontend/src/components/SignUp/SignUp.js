import React from 'react';
import { Link } from "react-router-dom"

export default class SignUp extends React.Component {
    render() {
        return(
            <div className="form-container">
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