import Article from '../models/article';
import { responseClient } from '../util';

// 添加文章 post
exports.addArticle = (req, res) => {
  const {title, author, keyword, content, desc, img_url, tags, category, state, type, origin } = req.body;
  let tempArticle = null;
  tempArticle = new Article({
    title,
    author,
    keyword: keyword ? keyword.split(',') : [],
    content,
    numbers: content.length,
    desc, //描述
    img_url,
    tags: tags ? tags.split(',') : [],
    category: category ? category.split(',') : [],
    state, //发布状态
    type,
    origin, //转载
  })
  tempArticle.save().then(data => {
    responseClient(res, 200, 0, '保存成功', data)
  }).catch(err => {
    console.log(err);
    responseClient(res);
  })
}

// 文章列表 (get)
exports.getArticleList = (req, res) => {
  let keyword = req.query.keyword || null;
  let state = req.query.state || '';
  let likes = req.query.likes || '';
  let tag_id = req.query.tag_id || ''; //标签分类
  let category_id = req.query.category_id || '';
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;
  let conditions = {};
  const reg = new RegExp(keyword, 'i') //不区分大小写
  // 草稿状态
  if (!state) {
    if (keyword) {
      conditions = {
        $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }],
      }
    }
  } else if (state) {
    // 非草稿状态
    state = parseInt(state);
    if (keyword) {
			conditions = {
				$and: [
					{ $or: [{ state: state }] },
					{ $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }, { keyword: { $regex: reg } }] },
				],
			};
		} else {
			conditions = { state };
		}
  }

  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };
  Article.count(conditions, (err, count) => {

    if (err) {
      console.log('Error': err);
    } else {
      responseData.count = count;
      // 待返回的字段
			let fields = {
				title: 1,
				author: 1,
				keyword: 1,
				content: 1,
				desc: 1,
				img_url: 1,
				tags: 1,
				category: 1,
				state: 1,
				type: 1,
				origin: 1,
				comments: 1,
				like_User_id: 1,
				meta: 1,
				create_time: 1,
				update_time: 1,
      };
      let options = {
				skip: skip,
				limit: pageSize,
				sort: { create_time: -1 },
      };
      Article.find(conditions, fields, options, (err, result) => {
        if (err) {
          console.log("Error:" + error)
        } else {
          let newList = [];
          if (likes) {
            // 根据热度返回数据
            result.sort((a, b) => {
              return b.meta.likes - a.meta.likes
            });
            responseData.list = result;
          }else if (category_id) {
            // 根据分类id返回数据
            result.forEach(item => {
              if (item.category.indexOf(category_id) > -1) {
                newList.push(item);
              }
            });
            let len = newList.length;
            responseData.count = len;
            responseData.list = result;
          } else if(tag_id) {
            // 根据标签 id 返回数据
            result.forEach(item => {
              if (item.category.indexOf(category_id) > -1) {
                newList.push(item);
              }
            });
            let len = newList.length;
            responseData.count = len;
            responseData.list = result;
          } else {
            responseData.list = result;
          }
          responseClient(res, 200, 0, '操作成功', responseData);
        }
      });
    }
  });
};
