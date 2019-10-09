import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';
import Contact from '../components/Contact/Contact';
import Warehouse from '../components/Warehouse/Warehouse';
import Invoice from '../components/Invoice/Invoice'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/contact' component={Contact} />
        <Route path='/invoice' component={Invoice}/>
        <Route path='/warehouse/:id' component={Warehouse} />
    </Switch>
)