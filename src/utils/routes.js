import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';
import Contact from '../components/Contact/Contact';
import Warehouse from '../components/Warehouse/Warehouse';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route exact path='/contact' component={Contact} />
        <Route path='/warehouse/:id' component={Warehouse} />
    </Switch>
)