import axios from 'axios';

// Call on backend to add new user to users table
export const newUser = async (username, password) => {
    try {
        const res = await axios.post("http://localhost:3001/new-user", {username, password});
        return res.data;
    } catch (err) {
        console.log("There was a problem adding a user to database (on frontend).")
        throw err;
    }
};

export const getUser = async (username, password) => {
    try {
        const res = await axios.post("http://localhost:3001/login", {username, password});
        return res.data;
    } catch (err) {
        console.log("There was a problem finding this user in the database.")
        throw err;
    }
};