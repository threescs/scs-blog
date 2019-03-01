import './index.less';
import React, { Component } from 'react';
import { Icon, Avatar, message } from 'antd';
import { Link } from 'react-router-dom';
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
      list: [],
    };
    this.loadLink = this.loadLink.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.loadLink();
    this.handleSearch();
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

  // tag
  handleSearch = () => {
    const { keyword, pageNum, pageSize } = this.state;
    https.get('getTagList', {
      params: {
        keyword,
        pageNum,
        pageSize,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          list: res.data.data.list,
        });
      } else {
        message.error(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { linkList, list } = this.state;
    const listChildren = list.map(item => (
        <Link className="item" key={item._id} to={`/articles?tag_id=${item._id}&tag_name=${item.name}&category_id=`}>
            <span key={item._id}>{item.name}</span>
        </Link>
    ));
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
            <div className="right-content" />
            <div className="introduce">
                <div className="title">个人介绍</div>
                <div className="content">


                自律的人生,看似艰辛,其实自由的很。
                    {' '}
                    <br />
                    {' '}


这里会不定时的分享相关技术博客,同时记录我的点滴。
                    {' '}
                    <br />
                    {' '}


Wonderful Life !
                </div>
                <div className="footer">{linkChildren}</div>
            </div>
            <div className="tags">
                <div className="title">标签云</div>
                {listChildren}
            </div>
        </div>
    );
  }
}

export default SliderRight;
