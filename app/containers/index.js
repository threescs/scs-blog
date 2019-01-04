import React, { Component } from 'react';
import PureRenderMixiin from 'react-addons-pure-render-mixin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routers from '../router/index';

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
            <Switch>
                {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
            </Switch>
        </Router>
    );
  }
}
export default AppIndex;
