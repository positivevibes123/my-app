const { sessionKey, dbPasswd } = require('./private');

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

// Create instance of express application
const app = express();
app.use(cors());

// Creates session object to store session data
app.use(session({secret: sessionKey, name: 'uniqueSessionID', saveUninitialized: false}));

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

    // Check to make sure a user with the selected username doesn't already exist
    const checkQuery = `SELECT * FROM users WHERE username = ?`;

    connection.query(checkQuery, [username], (err, results) => {
        if (err) {
            console.log("Error checking username against database for signup.")
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length > 0) {
            console.log("User already exists with this username.");
            return res.status(400).json({ error: "Username already exists" });
        } else {
            // If the username doesn't exist yet, get added to database
            const queryString = `INSERT INTO users (username, passHash) VALUES (?, ?)`;
            connection.query(queryString, [username, password], (err, results) => {
                if (err) {
                    console.log("Error adding new user to database.");
                    return res.status(500).json({ error: "Internal server error" });
                }

                if (results.length > 0) {
                    // Response was valid
            
                    return res.status(201);
                }
            });
        }
    });
})

// Check to see if a user exists in the users table
app.post('/login', (req, results) => {
    var reqBody = req.body;

    const username = reqBody.username;
    const password = reqBody.password;

    const queryString = `SELECT username FROM users WHERE username = ? AND passHash = ?`;
    connection.query(queryString, [username, password], (err, res) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        // Login was successful
        if (results.length > 0) {
            req.session.loggedIn = true;
            req.session.username = username;
            return res.status(200).json({ message: "Login successful" });
        } else {
            // Invalid login
            return res.status(401).json({ error: "Invalid username or password" });
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
