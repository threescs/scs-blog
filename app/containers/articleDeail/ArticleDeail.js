import './index.less';
import './marked.css';
import React, { Component } from 'react';
import { Icon, Avatar, message } from 'antd';
import logo from '../../assets/scs.jpg';
import LoadingCom from '../../components/loading/Loading';
import https from '../../fetch/fetch';
import { getQueryStringByName, timestampToTime } from '../../util/util';

class ArticlesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      type: 1,
      article_id: getQueryStringByName('article_id'),
      articleDetail: {
        _id: '',
        author: 'scs',
        category: [],
        comments: [],
        create_time: '',
        desc: '',
        id: 16,
        img_url: '',
        numbers: 0,
        keyword: [],
        like_users: [],
        meta: { views: 0, likes: 0, comments: 0 },
        origin: 0,
        state: 1,
        tags: [],
        title: '',
        update_time: '',
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    const { article_id } = this.state;
    this.handleSearch(article_id);
  }

  // 文章详情
  handleSearch(article_id) {
    const { type } = this.state;
    this.setState({
      isLoading: true,
    });
    https.post('getArticleDetail', { id: article_id, type }, { withCredentials: true }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          articleDetail: res.data.data,
          isLoading: false,
        });
        // const keyword = res.data.data.keyword.join(','); // 文章关键字
        // const description = res.data.data.desc;
        const { title } = res.data.data;
        document.title = title;
      } else {
        message.error(res.data.message, 1);
      }
    }).catch((err) => {
      console.log(err);
    });
  }


  render() {
    const { articleDetail, isLoading } = this.state;
    const list = articleDetail.tags.map(item => (
        <span key={item.id} className="tag">
            {item.name}
        </span>
    ));
    return (
        <div className="article">
            <div className="header">
                <div className="title">{articleDetail.title}</div>
                <div className="author">
                    <a className="avatar" href="/articles">
                        <Avatar className="auth-logo" src={logo} size={50} icon="user" />
                    </a>
                    {' '}
                    <div className="info">
                        <span className="name">
                            <a href="/articles">{articleDetail.author}</a>
                        </span>
                        <div props-data-classes="user-follow-button-header" data-author-follow-button="" />
                        <div className="meta">
                            <span className="publish-time">
                                {articleDetail.create_time ? timestampToTime(articleDetail.create_time, true) : ''}
                            </span>
                            <span className="wordage">
字数
                                {articleDetail.numbers}
                            </span>
                            <span className="views-count">
阅读
                                {articleDetail.meta.views}
                            </span>
                            <span className="comments-count">
评论
                                {articleDetail.meta.comments}
                            </span>
                            <span className="likes-count">
喜欢
                                {articleDetail.meta.likes}
                            </span>
                        </div>
                    </div>
                    <div className="tags " title="标签">
                        <Icon type="tags" theme="outlined" />
                        {list}
                    </div>
                    <span className="clearfix" />
                </div>
            </div>
            {isLoading ? <LoadingCom /> : ''}
        </div>
    );
  }
}

export default ArticlesDetail;
