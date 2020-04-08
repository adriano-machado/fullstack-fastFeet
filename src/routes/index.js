import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import Deliverymans from '../pages/Deliverymans';
import DeliverymansCreate from '../pages/DeliverymansCreate';
import DeliverymansEdit from '../pages/DeliverymansEdit';

import Deliveries from '../pages/Deliveries';
import DeliveriesCreate from '../pages/DeliveriesCreate';
import DeliveriesEdit from '../pages/DeliveriesEdit';

import Recipients from '../pages/Recipients';
import RecipientsCreate from '../pages/RecipientsCreate';
import RecipientsEdit from '../pages/RecipientsEdit';

import Problems from '../pages/Problems';
import { ROUTES } from '../consts';

export default function Routes() {
    return (
        <Switch>
            <Route path={ROUTES.SIGNIN} exact component={SignIn} />
            <Route
                path={ROUTES.DELIVERYMANS}
                component={Deliverymans}
                isPrivate
                exact
            />
            <Route
                path={ROUTES.DELIVERYMANS_CREATE}
                component={DeliverymansCreate}
                isPrivate
            />
            <Route
                path={ROUTES.DELIVERYMANS_EDIT}
                component={DeliverymansEdit}
                isPrivate
            />
            <Route
                path={ROUTES.DELIVERIES}
                component={Deliveries}
                isPrivate
                exact
            />

            <Route
                path={ROUTES.DELIVERIES_CREATE}
                component={DeliveriesCreate}
                isPrivate
            />

            <Route
                path={ROUTES.DELIVERIES_EDIT}
                component={DeliveriesEdit}
                isPrivate
            />

            <Route
                path={ROUTES.RECIPIENTS}
                component={Recipients}
                isPrivate
                exact
            />
            <Route
                path={ROUTES.RECIPIENTS_CREATE}
                component={RecipientsCreate}
                isPrivate
            />
            <Route
                path={ROUTES.RECIPIENTS_EDIT}
                component={RecipientsEdit}
                isPrivate
            />

            <Route path={ROUTES.PROBLEMS} component={Problems} isPrivate />
        </Switch>
    );
}
