import { mongoose } from "../core/mongodb";

// 分类集合模型
const categorySchema = new mongoose.Schema({
	// 分类名称
	name: { type: String, required: true, validate: /\S+/ },

	// 分类描述
	desc: { type: String, default: '' },

	// 创建日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now },
});

module.exports = categorySchema;
