import React, { Component } from 'react';
import { Icon, Spin } from 'antd';

class LoadingCom extends Component {
  render() {
    const style = {
      color: '#999',
      textAlign: 'center',
      padding: 50,
      fontSize: 16,
    };
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
        <div style={style}>
            <Spin indicator={antIcon} />
        </div>
    );
  }
}

export default LoadingCom;
