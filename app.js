const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const path = require('path'); // For handling file paths

const app = express();
const port = 3000;
const nodemailer = require('nodemailer');

// Create a transporter object with SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'omerbindaud@gmail.com',
        pass: 'xbrf xuzz utsi sxer' // Replace with the generated App Password
    },
    tls: { rejectUnauthorized: false }
});

// Function to send email
function sendEmail(name, email, contact, message) {
    const mailOptions = {
        from: 'omerbindaud@gmail.com',
        to: 'omerbindawood@gmail.com',
        subject: 'New Contact Form Submission',
        text: `
            New contact form submission:
            
            Name: ${name}
            Email: ${email}
            Contact Number: ${contact}
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


// Serve static files (CSS, JS, images) from the root directory
app.use(express.static(__dirname));

// Define routes to serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

app.get('/blogs', (req, res) => {
    res.sendFile(path.join(__dirname, 'blogs.html'));
});

app.get('/testimonials', (req, res) => {
    res.sendFile(path.join(__dirname, 'testimonials.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Middleware to parse JSON and URL-encoded form data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Handle POST requests to the /contact route
app.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const message = req.body.message;
    
    // Create MySQL connection
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "03378624781",
        database: "users" // Make sure this database exists and contains a 'users' table
    });

    // Connect to MySQL database and perform queries
    con.connect(err => {
        if (err) {
            console.error("Error connecting to the database:", err);
            return;
        }
        console.log("Connected to database!");

        // Query to insert records into the 'users' table
        const sql = `INSERT INTO users (name, email, number, message) VALUES ('${name}', '${email}', '${contact}', '${message}')`;
        
        con.query(sql, (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                res.status(500).send("Error submitting form.");
                return;
            }
            
            console.log("Form data inserted successfully:", result);
            res.send("Form Successfully Submitted.");

             // Send notification email
            sendEmail(name, email, contact, message);
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
