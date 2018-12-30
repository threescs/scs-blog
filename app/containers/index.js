import React, { Component } from 'react';
import PureRenderMixiin from 'react-addons-pure-render-mixin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './root/Root';
import Room from './room/Room';

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
                <Route exact path="/" component={Root} />
                <Route path="/room" component={Room} />
            </Switch>
        </Router>
    );
  }
}
export default AppIndex;
