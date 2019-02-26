/**
 * Link model
 */

const linkSchema = require('../schemas/link');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

//  自增ID插件配置
linkSchema.plugin(autoIncrement.plugin, {
  model: 'Link',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

// 文章模型
module.exports = mongoose.model('Link', linkSchema);
