import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';
import Contact from '../components/Contact/Contact';

import Invoice from '../components/Invoice/Invoice';
import Inventory from '../components/Inventory/Inventory';
import Order from '../components/Order/Order'
import Search from '../components/Search/Search'; 
import CompanyRegister from '../components/CompanyRegister/CompanyRegister'
import EmployeeManage from '../components/EmployeeManage/EmployeeManage'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import CompanyDashboard from '../components/CompanyDashboard/CompanyDashboard'
import Quote from '../components/Quote/Quote'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/contact' component={Contact} />
        <Route exact path='/admin/dashboard' component={AdminDashboard}/>
        <Route exact path='/company/dashboard' component={CompanyDashboard}/>
        <Route path='/:company/dashboard' component={Dashboard}/>
        <Route path='/:company/invoice/:id' component={Invoice}/>
        <Route path='/:company/inventory/:id' component={Inventory}/>
        <Route path='/order' component={Order}/>
        <Route path='/register-company' component={CompanyRegister}/>
        <Route path='/:company/quote/:id' component={Quote}/>
        <Route path='/:company/order/:id' component={Order}/>
        <Route path='/:company/search/:id' component={Search}/> 
        <Route path='/register-company' component={CompanyRegister} />
        <Route path='/:company/employee/:warehouse' component={EmployeeManage} />
    </Switch>
)