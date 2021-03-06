/**
 * Article 文章表结构
 */

const {
  mongoose
} = require('../core/mongodb');

// 文章模型
const artcleSchema = new mongoose.Schema({
  // 文章标题
  title: {
    type: String,
    required: true,
    validate: /\S+/
  },

  // 文章关键字
  keyword: [{
    type: String,
    default: ''
  }],

  // 作者
  author: {
    type: String,
    required: true,
    validate: /\S+/
  },

  // 文章描述
  desc: {
    type: String,
    default: ''
  },

  // 文章内容
  content: {
    type: String,
    required: true,
    validate: /\S+/
  },

  // 字数
  numbers: {
    type: String,
    default: 0
  },

  // 封面图
  img_url: {
    type: String,
    default: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D180%2C140%2C50/sign=4bfff88add58ccbf1be9e67a7fe58d06/9213b07eca806538f4f6f52b9bdda144ad3482ee.jpg'
  },

  // 文章类型 => 1: 普通文章, 2: 关于我
  type: {
    type: Number,
    default: 1,
  },

  // 文章发布状态 => 0 草稿, 1 已发布
  state: {
    type: Number,
    default: 1
  },

  // 文章转载状态 => 0 原创, 1 转载
  origin: {
    type: Number,
    default: 0
  },

  // 文章标签
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true
  }],

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  }],

  // 文章分类
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],

  // 点赞的用户
  like_users: [{
    // 用户id
    id: {
      type: mongoose.Schema.Types.ObjectId
    },

    // 名字
    name: {
      type: String,
      required: true,
      default: ''
    },

    // 用户类型 0：博主 1：其他用户
    type: {
      type: Number,
      default: 1
    },

    // 个人介绍
    introduce: {
      type: String,
      default: ''
    },

    // 头像
    avatar: {
      type: String,
      default: 'user'
    },

    // 创建日期
    create_time: {
      type: Date,
      default: Date.now
    },
  }, ],

  // 其他元信息
  meta: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
  },
  // 创建日期
  create_time: {
    type: Date,
    default: Date.now
  },

  // 最后修改日期
  update_time: {
    type: Date,
    default: Date.now
  },
})

module.exports = artcleSchema;
