import './index.less';
import React, { Component } from 'React';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu, Row, Col, Drawer } from 'antd';
import logo from '../../assets/scs.jpg';
import { isMobileOrPc } from '../../util/util';
// import NewArticle from '../newArticle/NewArticle';

const { Header } = Layout;

class Nav extends Component {
  static propTypes = {
    pathname: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      visible: false,
      // newArticle: false,
      placement: 'top',
      menuCurrent: '',
      navTitle: '首页',
    };
    this.initMenu = this.initMenu.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.onClose = this.onClose.bind(this);
    // this.showNewArticleModal = this.showNewArticleModal.bind(this);
    // this.handleNewArticleCancel = this.handleNewArticleCancel.bind(this);
  }

  componentDidMount() {
    const { pathname } = this.props;
    if (isMobileOrPc()) {
      this.setState({
        isMobile: true,
      });
    }
    this.initMenu(pathname);
  }

  componentWillReceiveProps(nextProps) {
    this.initMenu(nextProps.pathname);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleMenu = (e) => {
    this.setState({
      menuCurrent: e.key,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  // showNewArticleModal = () => {
  //   this.setState({
  //     newArticle: true,
  //   });
  // };

  // handleNewArticleCancel = () => {
  //   this.setState({
  //     newArticle: false,
  //   });
  // };

  initMenu(name) {
    let key = '1';
    let navTitle = '';
    if (name === '/') {
      key = '1';
      navTitle = '首页';
    } else if (name === '/articles') {
      key = '2';
      navTitle = '博客';
    } else if (name === '/hot') {
      key = '3';
      navTitle = '热门';
    }
    this.setState({
      navTitle,
      menuCurrent: key,
    });
  }

  render() {
    const { isMobile, navTitle, menuCurrent, placement, visible } = this.state;
    return (
        <div className="left">
            {isMobile ? (
                <Header
                    className="header"
                    style={{
                      position: 'fixed',
                      zIndex: 1,
                      top: 0,
                      width: '100%',
                      height: '64px',
                      float: 'left',
                      backgroundColor: 'white',
                      borderBottom: '1px solid #eee',
                    }}
                >
                    <Row className="container">
                        <Col style={{ width: '25%', float: 'left', lineHeight: '64px' }}>
                            <a href="/">
                                <div className="logo">
                                    <img src={logo} alt="" />
                                </div>
                            </a>
                        </Col>
                        <Col style={{ textAlign: 'center', width: '50%', float: 'left' }}>
                            <div className="nav-title">
                                {navTitle}
                            </div>
                        </Col>
                        <Col style={{ textAlign: 'right', width: '25%', float: 'left' }}>
                            <div>
                                <Icon
                                    type="bars"
                                    onClick={this.showDrawer}
                                    style={{ fontSize: '40px', marginRight: '10px', marginTop: '10px' }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Header>
            ) : (
                <Header
                    className="header"
                    style={{
                      position: 'fixed',
                      zIndex: 1,
                      top: 0,
                      width: '100%',
                      minWidth: '1200px',
                      height: '66px',
                      float: 'left',
                      backgroundColor: 'white',
                      borderBottom: '1px solid #eee',
                    }}
                >
                    <Row className="container">
                        <Col style={{ width: '120px', float: 'left' }}>
                            <a href="/">
                                <div className="logo ">
                                    <img src={logo} alt="" />
                                </div>
                            </a>
                        </Col>
                        <Col style={{ width: '780px', float: 'left' }}>
                            <Menu
                                theme="light"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                onClick={this.handleMenu}
                                selectedKeys={[menuCurrent]}
                                style={{ lineHeight: '64px', borderBottom: 'none' }}
                            >
                                <Menu.Item key="1">
                                    <Link to="/">
                                        <Icon type="home" theme="outlined" />

首页

                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/articles">
                                        <Icon type="smile" theme="outlined" />

博客

                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/hot">
                                        <Icon type="fire" theme="outlined" />

热门

                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        {/* <Col style={{ textAlign: 'right', width: '300px', float: 'left' }}>
                            <div>
                                <Button
                                    type="primary"
                                    icon="form"
                                    style={{ marginRight: '15px' }}
                                    onClick={this.showNewArticleModal}
                                >

                              发文章
                                </Button>
                            </div>
                        </Col> */}
                    </Row>
                </Header>
            )}
            {/* mobile下拉 */}
            <Drawer
                placement={placement}
                closable={false}
                onClose={this.onClose}
                visible={visible}
                height={200}
            >
                <div className="drawer">
                    <p onClick={this.onClose}>
                        <Link to="/articles">
                            <Icon type="home" />
                            {' '}

博客

                        </Link>
                    </p>
                    <p onClick={this.onClose}>
                        <Link to="/hot">
                            <Icon type="fire" />
                            {' '}

热门
                        </Link>
                    </p>
                </div>
            </Drawer>
            {/* <NewArticle newArticleVisible={newArticle} handleCancel={this.handleNewArticleCancel} /> */}
        </div>
    );
  }
}

export default Nav;
