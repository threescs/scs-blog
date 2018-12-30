import React, { Component } from 'react';
import PropTypes from 'prop-type';
import Open from '../../components/open/Open';

class Root extends Component {
  static propTypes = {
    history: PropTypes.array,
  }

  render() {
    const { history } = this.props;
    return (
        <Open history={history} />
    );
  }
}
export default Root;
