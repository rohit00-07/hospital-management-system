const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // Import the path module

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rohit',  // Ensure this matches your actual password
    database: 'hospital_db'
});

// Serve index.html on GET /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

/// POST route to add a new patient
app.post('/patients', (req, res) => {
    const { name, age, disease } = req.body; // Get the disease from the request body
    const query = 'INSERT INTO patients (name, age, disease) VALUES (?, ?, ?)';

    db.query(query, [name, age, disease], (err, results) => {
        if (err) {
            console.error('Error adding patient:', err);
            return res.status(500).send('Error adding patient');
        }
        res.status(201).send('Patient added successfully');
    });
});

// GET route to fetch all patients
app.get('/patients', (req, res) => {
    db.query('SELECT * FROM patients ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Error fetching patients:', err);
            return res.status(500).send('Error fetching patients');
        }
        res.json(results); // Return the patient data as JSON
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
