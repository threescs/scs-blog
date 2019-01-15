import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routers from '../router/index';
import Layouts from './views/Layout';

const AppIndex = () => (
    <Router>
        <Switch>
            <Layouts>
                {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
            </Layouts>
        </Switch>
    </Router>
);

export default AppIndex;
