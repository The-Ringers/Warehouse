require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const massive = require('massive'); 
const session = require('express-session'); 

// Controller Files 

// ENV Variables 
const {
    SERVER_PORT,
    CONNECTION_STRING, 
    SESSION_SECRET
} = precess.env; 

// App Instace 
const app = express(); 

// Top Level Middleware 
app.use(express.json()); 
app.use(cors()); 
app.use(session({
    resave: false, 
    saveUninitialized: true, 
    secret: SESSION_SECRET
}))