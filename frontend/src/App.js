import React from 'react';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/SignUp' element={<SignUp />} />
                </Routes>
    
            </BrowserRouter>
        );
    }
}