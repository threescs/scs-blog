import { mongoose } from "../core/mongodb";

/**
 * Tag 标签表结构
 */

 const tagSchema = new mongoose.Schema({

  //  标签名称
  name: { type: String, required: true, validate: /\S+/ },

  // 标签描述
  desc: String,

  // 图标
  icon: String,

  // 创建时间
  create_time: { type: Date, default: Date.now },

  // 最后修改时间
  update_time: { type: Date, default: Date.now },
 });

 module.exports = tagSchema;
