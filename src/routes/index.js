import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import Deliverymans from '../pages/Deliverymans';

import Deliveries from '../pages/Deliveries';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/deliverymans" component={Deliverymans} isPrivate />
            <Route path="/deliveries" component={Deliveries} isPrivate />
            <Route path="/recipients" component={Recipients} isPrivate />
            <Route path="/problems" component={Problems} isPrivate />
        </Switch>
    );
}
