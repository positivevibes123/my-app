const { sessionKey, dbPasswd } = require('./private');

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

// Create instance of express application
const app = express();
app.use(cors());

// Creates session object to store session data
app.use(session({secret: sessionKey}));

app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Specify a port number for the server
const port = 3001;

// Create a connection to the MySQL database (DO NOT UPLOAD W/ REAL PASSWORD!)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPasswd,
    database: 'app_schema'
});

connection.connect(error => {
    if (!error) {
        console.log("Successfully connected to SQL database.");
    }
    else {
        console.log("Error has occured connecting to SQL Database.");
        throw error;
    }
})

app.get('/', function(req, res) {
    res.send("Hello!");
});

// Add a new user to users table
app.post('/new-user', (req, res) => {
    var reqBody = req.body;

    const username = reqBody.username;
    const password = reqBody.password;
    
    const queryString = `INSERT INTO users (username, passHash) VALUES (?, ?)`;
    connection.query(queryString, [username, password], (err, res) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });
})

// Check to see if a user exists in the users table
app.post('/login', (req, res) => {
    var reqBody = req.body;

    const username = reqBody.username;
    const password = reqBody.password;

    const queryString = `SELECT username FROM users WHERE username = ? AND passHash = ?`;
    connection.query(queryString, [username, password], (err, res) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        // Login was successful
        if (res.length > 0) {

        }
    });
});

// Start the server and listen to the port

app.listen(port, (error) => {
    if (!error) {
        console.log("Server successfully running");
    }
    else {
        console.log("There was a problem trying to start server.");
        throw error;
    }
});
