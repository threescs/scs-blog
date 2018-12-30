import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Open from '../../components/open/Open';

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  render() {
    const { history } = this.props;
    return (
        <Open history={history} />
    );
  }
}
