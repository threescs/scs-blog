/**
 * Category model
 */
const categorySchema = require('../schemas/category');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

//  自增ID插件配置
categorySchema.plugin(autoIncrement.plugin, {
 model: 'Category',
 fieId: 'id',
 startAt: 1,
 incrementBy: 1
});

// 文章模型
module.exports = mongoose.model('Category', categorySchema);
