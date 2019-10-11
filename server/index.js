require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const massive = require('massive'); 
const session = require('express-session'); 
const nodeMailerCtrl = require('./controllers/nodeMailerController')

// Controller Files
const authCtrl = require('./controllers/authController.js')
const inventoryCtrl = require('./controllers/inventoryController'); 

// Middleware Files

// ENV Variables 
const {
    SERVER_PORT,
    CONNECTION_STRING, 
    SESSION_SECRET
} = process.env; 

// App Instace 
const app = express(); 

// Top Level Middleware 
app.use(express.json()); 
app.use(cors()); 
app.use(session({
    resave: false, 
    saveUninitialized: true, 
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000000
    }
}));

// DB Connection 
massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
        console.log('Database Connected'); 
    })
    .catch(err => console.log(err)); 

// Auth EndPoints
app.post('/api/register', authCtrl.register); 
app.post('/api/register/company', authController.registerCompany)
app.post('/api/login', authCtrl.login);  
app.delete('/api/logout', authCtrl.logout); 
app.delete('/api/delete-user/:id', authCtrl.deleteUser); 
app.put('/api/update-user/:id', authCtrl.updateUser); 
app.put('/api/update-password', authCtrl.updatePassword); 

// Sales Endpoints
app.get('/api/sales/:id',); 
app.get('/api/sales', ); 
app.post('/api/sales', ); 
app.put('/api/sales/:id', );
app.delete('/api/sales/:id', ); 

// Inventory Endpoints
app.get('/api/inventory', inventoryCtrl.searchInventory); 
app.get('/api/inventory/:id', inventoryCtrl.getSingleInventory);
app.post('/api/inventory', inventoryCtrl.addInventory); 
app.put('/api/inventory/:id', inventoryCtrl.editInventory); 
app.delete('/api/inventory/:id', inventoryCtrl.deleteInventory); 

// NodeMailer Endpoints
app.post('/api/send', nodeMailerCtrl.mail)

// Server listening
app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`)); 