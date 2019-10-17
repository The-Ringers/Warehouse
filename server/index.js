require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const massive = require('massive'); 
const session = require('express-session'); 

// Controller Files
const authCtrl = require('./controllers/authController.js');
const inventoryCtrl = require('./controllers/inventoryController'); 
const companyCtrl = require('./controllers/companyController')
const salesCtrl = require('./controllers/salesController');
const adminCtrl = require('./controllers/adminController')
const nodeMailerCtrl = require('./controllers/nodeMailerController');

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
app.post('/api/login', authCtrl.login);  
app.delete('/api/logout', authCtrl.logout); 
app.delete('/api/delete-user/:id', authCtrl.deleteUser); 
app.put('/api/update-user/:id', authCtrl.updateUser); 
app.put('/api/update-password', authCtrl.updatePassword); 

// Sales Endpoints
app.get('/api/sales/:id', salesCtrl.getSingleSales); 
app.post('/api/sales', salesCtrl.createSales); 
app.put('/api/sales/:id', salesCtrl.editSales);

// TODO: we don't need a get all sales at this time.
// app.get('/api/sales', salesCtrl); 
// TODO: we don't need a delete at this time. 
// app.delete('/api/sales/:id', salesCtrl); 

// Inventory Endpoints
app.get('/api/categories/:id', inventoryCtrl.getCategories)
app.get('/api/inventory', inventoryCtrl.searchInventory); 
app.get('/api/inventory/:id', inventoryCtrl.getSingleInventory);
app.post('/api/inventory', inventoryCtrl.addInventory); 
app.put('/api/inventory/edit', inventoryCtrl.editInventory); 
app.delete('/api/inventory/:inventory_id', inventoryCtrl.deleteInventory); 

// Company Endpoints
app.post('/api/company/', companyCtrl.register)

// Admin Endpoints
app.post('/api/admin/employee', adminCtrl.addEmployee)
app.get('/api/admin/employee/:warehouse_id', adminCtrl.getEmployees)
app.put('/api/admin/employee/:id', adminCtrl.editEmployee)
app.delete('/api/admin/employee/:id', adminCtrl.deleteEmployee)

// NodeMailer Endpoints
app.post('/api/send', nodeMailerCtrl.mail)

// Server listening
app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`)); 