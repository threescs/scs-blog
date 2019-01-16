/**
 * Tag model
 */

const tagSchema = require('../schemas/tag');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

//  自增ID插件配置
tagSchema.plugin(autoIncrement.plugin, {
  model: 'tag',
  fieId: 'id',
  startAt: 1,
  incrementBy: 1
});

// 文章模型
module.exports = mongoose.model('tag', tagSchema);
