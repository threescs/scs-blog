import './index.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import https from '../../fetch/fetch';
import { getScrollTop, getDocumentHeight, getWindowHeight, getQueryStringByName, timestampToTime } from '../../util/util';
import { saveArticlesList } from '../../store/actions/articles';
import LoadingCom from '../../components/loading/Loading';
import LoadEndCom from '../../components/loadEnd/LoadEnd';

@connect(state => state.getIn(['articles']), { saveArticlesList })
class Articles extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        isLoadEnd: false,
        isLoading: false,
        keyword: '', // 关键字
        likes: '', // 是否是热门文章
        state: 1, // 文章发布
        tag_id: getQueryStringByName('tag_id'), // 标签id
        tag_name: decodeURI(getQueryStringByName('tag_name')),
        category_id: getQueryStringByName('category_id'), // 文章分类id,
        pageNum: 1,
        pageSize: 10,
        articlesList: [],
        total: 0,
      };
      this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
      const { location } = this.props;
      if (location.pathname === '/hot') {
        this.setState(
          {
            likes: true,
          },
          () => {
            this.handleSearch();
          },
        );
      } else {
        this.handleSearch();
      }
      window.onscroll = () => {
        if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        // 如果不是已经没有数据了，都可以继续滚动加载
          const { isLoadEnd, isLoading } = this.state;
          if (isLoadEnd === false && isLoading === false) {
            this.handleSearch();
          }
        }
      };
    }

    componentWillReceiveProps(nextProps) {
      const { location } = this.props;
      if (nextProps.location.search !== location.search) {
        this.setState(
          {
            pageNum: 1,
            articlesList: [],
            tag_id: getQueryStringByName('tag_id'),
            tag_name: decodeURI(getQueryStringByName('tag_name')),
            category_id: getQueryStringByName('category_id'),
          },
          () => {
            this.handleSearch();
          },
        );
      }
    }

    handleSearch() {
      this.setState({
        isLoading: true,
      });
      const { keyword, likes, state, tag_id, category_id, pageNum, pageSize } = this.state;
      https.get('getArticleList', {
        params: {
          keyword,
          likes,
          state,
          tag_id,
          category_id,
          pageNum,
          pageSize,
        },
      }, { withCredentials: true }).then((res) => {
        let num = pageNum;
        if (res.status === 200 && res.data.code === 0) {
          this.setState(preState => ({
            articlesList: [...preState.articlesList, ...res.data.data.list],
            total: res.data.data.count,
            pageNum: ++num,
            isLoading: false,
          }));
          const { total, articlesList } = this.state;
          if (total === articlesList.length) {
            this.setState({
              isLoadEnd: true,
            });
          }
        }
      }).catch((err) => {
        console.error(err);
      });
    }

    render() {
      const { articlesList, tag_id, tag_name, isLoading, isLoadEnd } = this.state;
      const list = articlesList.map(item => (
          <ReactCSSTransitionGroup
              key={item._id}
              transitionName="example"
              transitionAppear
              transitionAppearTimeout={1000}
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
          >
              <li key={item._id} className="have-img">
                  <a className="wrap-img" href={`/articleDetail?article_id=${item._id}`} rel="noopener noreferrer" target="_blank">
                      <img className="img-blur-done" data-src={item.img_url} src={item.img_url} alt="120" />
                  </a>
                  <div className="content">
                      <Link className="title" target="_blank" to={`/articleDetail?article_id=${item._id}`}>
                          {item.title}
                      </Link>
                      <p className="abstract">{item.desc}</p>
                      <div className="meta">
                          <Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
                              <Icon type="eye" theme="outlined" />
                              {' '}
                              {item.meta.views}
                          </Link>
                          {' '}
                          <Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
                              <Icon type="message" theme="outlined" />
                              {' '}
                              {item.meta.comments}
                          </Link>
                          {' '}
                          <Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
                              <Icon type="heart" theme="outlined" />
                              {' '}
                              {item.meta.likes}
                          </Link>
                          <span className="time">{item.create_time ? timestampToTime(item.create_time) : ''}</span>
                      </div>
                  </div>
              </li>
          </ReactCSSTransitionGroup>
      ));

      return (
          <div className="left">
              {tag_id ? (
                  <h3 className="left-title">
                      {tag_name}
                      {' '}

相关的文章：
                  </h3>
              ) : ''}
              <ul className="note-list">{list}</ul>
              {isLoading ? <LoadingCom /> : ''}
              {isLoadEnd ? <LoadEndCom /> : ''}
          </div>
      );
    }
}
export default Articles;
