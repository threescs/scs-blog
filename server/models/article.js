/**
 * Article model
 */
 const articleSchema = require('../schemas/article');
 const { mongoose } = require('../core/mongodb.js');
 const autoIncrement = require('mongoose-auto-increment');

//  自增ID插件配置
articleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

// 文章模型
module.exports = mongoose.model('Article', articleSchema);
