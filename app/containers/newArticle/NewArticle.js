import './index.less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Icon, message, Button, Select } from 'antd';
import https from '../../fetch/fetch';

const { Option } = Select;
const { TextArea } = Input;

class newArticle extends Component {
  static propTypes = {
    newArticleVisible: PropTypes.bool,
    handleCancel: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      desc: '',
      keyword: '',
      pageNum: 1,
      pageSize: 50,
      list: [],
    };
    this.getTagList = this.getTagList.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitOk = this.submitOk.bind(this);
  }

  componentDidMount() {
    this.getTagList();
  }

  getTagList = () => {
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
  };

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitOk() {
    this.addArticle(this.state);
  }

  addArticle({ title, content, tags, desc }) {
    const { props } = this;
    https.post('addArticle', { title, content, tags, desc, author: '小帅' }, { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          message.success(res.data.message, 1);
          props.handleCancel();
          this.setState({
            title: '',
            content: '',
          });
        } else {
          message.error(res.data.message, 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { title, desc, content, tags, list } = this.state;
    const { newArticleVisible, handleCancel } = this.props;
    return (
        <Modal
            title="发文"
            width={800}
            footer={null}
            visible={newArticleVisible}
            onCancel={handleCancel}
        >
            <div className="model-container">
                <Input
                    className="titleInput"
                    placeholder="请输入文章标题"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="title"
                    onChange={this.handleChange}
                    value={title}
                />
                <Input
                    className="titleInput"
                    placeholder="请输入文章描述"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="desc"
                    onChange={this.handleChange}
                    value={desc}
                />
                <TextArea
                    className="textArea"
                    onChange={this.handleChange}
                    placeholder="支持markdown语法"
                    name="content"
                    value={content}
                />
                <Select
                    mode="multiple"
                    placeholder="请选择分类"
                    className="titleInput"
                    value={tags}
                >
                    {
              list.map(item => (
                  <Option key={item._id}>{item.name}</Option>
              ))
            }
                </Select>
            </div>
            <div className="login-submit">
                <Button style={{ width: '100%' }} type="primary" onClick={this.submitOk}>
            发布
                </Button>
            </div>
        </Modal>
    );
  }
}

export default newArticle;
