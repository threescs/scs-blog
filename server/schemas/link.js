import { mongoose } from "../core/mongodb";

/**
 * link 链接表结构
 */

 const linkSchema = new mongoose.Schema({

  //  链接名称
  name: { type: String, required: true, validate: /\S+/ },

  // 链接描述
  desc: { type: String, default: '' },

  // 链接 url
  url: { type: String, required: true, validate:  /\S+/, default: "" },

  // 图标
  icon: { type: String, default: '' },

  // 类型 => 1:其他友情链接 2:博主个人链接
  type: { type: Number, default: 1 },

  // 状态 => 0:不向外展示 1:向外展示
  state: { type: Number, default: 1 },

  // 创建时间
  create_time: { type: Date, default: Date.now },

  // 最后修改时间
  update_time: { type: Date, default: Date.now },
 });

 module.exports = linkSchema;
