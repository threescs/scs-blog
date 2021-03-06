import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, BackTop } from 'antd';
import SliderRight from '../slider/Slider';
import Nav from '../nav/Nav';
import { isMobileOrPc } from '../../util/util';
import gonganLogo from '../../assets/gonganbeian.png';

const { Content, Footer, Sider } = Layout;

export default class Layouts extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.array,
  };

  render() {
    let isShowSlider = false;
    let isPhone = false;
    const { children, location } = this.props;
    const { pathname } = location;
    if (pathname !== '/' && pathname !== '/room') {
      isShowSlider = true;
    }
    if (isMobileOrPc() || pathname === '/articleDetail') {
      isPhone = true;
    }
    return (
      !isShowSlider ? (<div style={{ height: '100%' }}>{children}</div>) : (
          <div className="Layouts">
              <Nav pathname={pathname} />
              <Layout className="layout">
                  <Content>
                      <Layout style={{ padding: '24px 0', background: '#fff' }}>
                          <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>{children}</Content>
                          {isPhone ? ('') : (
                              <Sider width={350} style={{ background: '#fff' }}>
                                  <SliderRight />
                              </Sider>
                          )}
                      </Layout>
                  </Content>
                  <Footer style={{ textAlign: 'center', background: '#fff' }}>


                    ©2019 一个Web开发者 Created by Scs | &nbsp;
                      <a target="_blank" href="http://www.miitbeian.gov.cn/" rel="noopener noreferrer">
                          <img style={{ width: '20px' }} src={gonganLogo} />

                      冀ICP备19004783号
                      </a>
                  </Footer>
              </Layout>
              <BackTop />
          </div>
      )

    );
  }
}
