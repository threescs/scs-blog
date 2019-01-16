import './index.less';
import React, { Component } from 'react';
import { Icon, Avatar, message } from 'antd';
import logo from '../../assets/scs.jpg';
import https from '../../fetch/fetch';

class SliderRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      type: 2,
      pageNum: 1,
      pageSize: 50,
      linkList: [],
    };
    this.loadLink = this.loadLink.bind(this);
  }

  componentDidMount() {
    this.loadLink();
  }

  loadLink = () => {
    const { type, keyword, pageNum, pageSize } = this.state;
    https.get('getLinkList', {
      params: {
        type,
        keyword,
        pageNum,
        pageSize,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          linkList: res.data.data.list,
        });
      } else {
        message.error(res.data.message);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { linkList } = this.state;
    const linkChildren = linkList.map(item => (
        <a key={item._id} target="_blank" rel="noopener noreferrer" href={item.url}>
            <Icon
                key={item._id}
                type={item.icon}
                theme="outlined"
                style={{ fontSize: '20px', marginRight: '10px' }}
            />
        </a>
    ));

    return (
        <div className="right">
            <Avatar className="right-logo" src={logo} size={130} icon="user" />
            <div className="title">Scs</div>
            <div className="right-content"></div>
            <div className="introduce">
                <div className="title">个人介绍</div>
                <div className="content">
          小帅的个人网站开启了!
                    {' '}
                    <br />
                    {' '}
小帅的个人网站开启了!
                    {' '}
                    <br />
                    {' '}
小帅的个人网站开启了!
                </div>
                <div className="footer">{linkChildren}</div>
            </div>
            <div className="tags">
                <div className="title">标签云</div>
            </div>
        </div>
    );
  }
}

export default SliderRight;
