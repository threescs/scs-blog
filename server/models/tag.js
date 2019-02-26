/**
 * Tag model
 */

const tagSchema = require('../schemas/tag');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');
console.log(autoIncrement);
//  自增ID插件配置
tagSchema.plugin(autoIncrement.plugin, {
	model: 'Tag',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 文章模型
module.exports = mongoose.model('Tag', tagSchema);
