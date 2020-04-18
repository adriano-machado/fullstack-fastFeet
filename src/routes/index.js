import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '~/pages/SignIn';

import Deliverymans from '~/pages/Deliverymans/DeliverymansList';
import DeliverymansCreate from '~/pages/Deliverymans/DeliverymansCreate';
import DeliverymansEdit from '~/pages/Deliverymans/DeliverymansEdit';

import Deliveries from '~/pages/Deliveries/DeliveriesList';
import DeliveriesCreate from '~/pages/Deliveries/DeliveriesCreate';
import DeliveriesEdit from '~/pages/Deliveries/DeliveriesEdit';

import Recipients from '~/pages/Recipients/RecipientsList';
import RecipientsCreate from '~/pages/Recipients/RecipientsCreate';
import RecipientsEdit from '~/pages/Recipients/RecipientsEdit';

import Problems from '~/pages/Problems';
import { ROUTES } from '~/consts';

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
