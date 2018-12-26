import React, { Component } from 'react';
import PureRenderMixiin from 'react-addons-pure-render-mixin';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Home from './home/Home';

class AppIndex extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixiin.shouldComponentUpdate.bind(
            this,
        );
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default AppIndex;
