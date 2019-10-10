import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';
import Contact from '../components/Contact/Contact';
import Invoice from '../components/Invoice/Invoice';
import Inventory from '../components/Inventory/Inventory';
import Order from '../components/Order/Order'


export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/contact' component={Contact} />
        <Route path='/:company/dashboard' component={Dashboard}/>
        <Route path='/:company/invoice/:id' component={Invoice}/>
        <Route path='/:company/inventory/:id' component={Inventory}/>
        <Route path='/order' component={Order}/>

    </Switch>
)