import React from 'react';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Notes from './components/Notes/Notes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='/Notes' element={<Notes />} />
            </Routes>

        </BrowserRouter>
    );
};

export default App;