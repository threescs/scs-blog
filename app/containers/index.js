import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routers from '../router/index';


const AppIndex = () => (
    <Router>
        <Switch>
            {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
        </Switch>
    </Router>
);

export default AppIndex;
