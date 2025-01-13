const { sessionKey, dbPasswd } = require('./private');

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

// Create instance of express application
const app = express();
app.use(cors());

// Creates session object to store session data
app.use(session({secret: sessionKey, name: 'uniqueSessionID', saveUninitialized: true}));

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

    if (!username || !password) {
        console.log('Username/password cannot be empty')
        return res.status(400).json({ error: 'Username/password cannot be empty' });
    }

    // Check to make sure a user with the selected username doesn't already exist
    const checkQuery = `SELECT * FROM users WHERE username = ?`;

    connection.query(checkQuery, [username], (err, results) => {
        if (err) {
            console.log("Error checking username against database for signup.")
            return res.status(500).json({ error: "Error checking to see if user in database" });
        }

        if (results.length > 0) {
            console.log("User already exists with this username.");
            return res.status(400).json({ error: "User already exists with this username." });
        } else {
            // If the username doesn't exist yet, get added to database
            const queryString = `INSERT INTO users (username, passHash) VALUES (?, ?)`;
            connection.query(queryString, [username, password], (err, results) => {
                if (err) {
                    console.log("Error adding new user to database.");
                    return res.status(500).json({ error: "Error adding new user to database." });
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
app.post('/login', (req, res) => {
    var reqBody = req.body;

    const username = reqBody.username;
    const password = reqBody.password;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username/password cannot be empty' });
    }

    const queryString = `SELECT id FROM users WHERE username = ? AND passHash = ?`;
    connection.query(queryString, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        // Login was successful
        if (results.length > 0) {
            req.session.loggedIn = true;
            const sessionId = results[0].id;
            req.session.id = sessionId;
            console.log("Session id: " + sessionId);
            return res.status(200).json({ message: "Login successful" });
        } else {
            // Invalid login
            return res.status(401).json({ error: "Invalid username or password" });
        }
    });
});

// Save list of user's tasks to db
app.post('/save-list', (req, res) => {
    const tasks = req.body.tasks;

    if (!Array.isArray(tasks)) {
        return res.status(400).json({ message: 'Invalid data format. Expected an array of tasks.' });
    }

     // Transform tasks to use 'text_key' (key term is reserved in SQL)
     const transformedTasks = tasks.map(task => ({
        text: task.text,
        text_key: task.key, // Map 'key' to 'text_key'
    }));

    // Prepare SQL query
    const insertTaskQuery = `INSERT INTO tasks (text, text_key, id) VALUES (?, ?, ?)`;

    // Loop through the tasks array and insert each task into the database
    transformedTasks.forEach(task => {
        const { text, text_key } = task;
        const id = req.session?.id; // Retrieve session ID if available

        if (!text || !text_key) {
            console.log('Missing text or key in task:', task);
            return; // Skip invalid task
        }

        connection.query(insertTaskQuery, [text, text_key, id], (err) => {
            if (err) {
                console.error('Error inserting task into database:', err);
            } else {
                console.log(`Task "${text}" with key "${text_key}" successfully inserted.`);
            }
        });
    });

    // Send a response after processing all tasks
    res.status(200).json({ message: 'Tasks saved successfully' });
});

// Retrieve list of user's tasks from db
app.get('/get-list', (req, res) => {
    const id = req.session?.id;

    if (!id) {
        return res.status(401).json({ message: 'Unauthorized. Session ID missing.' });
    }

    const fetchQuery = `SELECT text, text_key FROM tasks WHERE id = ?`;
    
    connection.query(fetchQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).json({ message: 'Error fetching tasks.' });
        }

        console.log("Id is: " + id);
        res.status(200).json(results);
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
