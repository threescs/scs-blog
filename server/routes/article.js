import Article from '../models/article';
import { responseClient } from '../util';

// 添加文章 post
exports.addArticle = (req, res) => {
  const {title, author, keyword, content, desc, img_url, tags, category, state, type, origin } = req.body;
  let tempArticle = null;
  if (img_url) {
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
    });
  } else {
    tempArticle = new Article({
      title,
      author,
      keyword: keyword ? keyword.split(',') : [],
      content,
      numbers: content.length,
      desc, //描述
      tags: tags ? tags.split(',') : [],
      category: category ? category.split(',') : [],
      state, //发布状态
      type,
      origin, //转载
    });
  }
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
      console.log('Error:',  err);
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
              if (item.tags.indexOf(tag_id) > -1) {
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

// 文章详情
exports.getArticleDetail = (req, res) => {
  let { id } = req.body;
  let type = Number(req.body.type) || 1; //文章类型 1普通文章 2个人介绍
  let fileter = Number(req.body.filter) || 1; //文章评论过滤
  if (type === 1) {
    if (!id) {
      console.error('id:' + id);
      responseClient(res, 200, 1, '文章不存在!');
      return;
    }
    Article.findOne({_id: id}, (error, data) => {
      if (error) {
        console.error('error:' + error);
        // throw error;
      } else {
        data.meta.views = data.meta.views + 1; //浏览量加+
        Article.updateOne({_id: id}, { meta: data.meta}).then(result => {
          if(fileter === 1) {
            const arr = data.comments
            for (let i = arr.length - 1; i >= 0; i--) {
              const e = arr[i]
              if (e.state !== 1) {
                  arr.splice(i, 1)
              }
              const newArr = e.other_comments
              const length = newArr.length
              if (length) {
                  for (let j = length - 1; j >= 0; j--) {
                      const item = newArr[j]
                      if (item.state !== 1) {
                          newArr.splice(j, 1)
                      }
                  }
              }
            }
          }
          responseClient(res, 200, 0, '操作成功 ！', data);
        }).catch(err => {
          console.error('err :', err);
          throw err;
      });
      }
    }).populate([ //关联表
      { path: 'tag', },
      { path: 'category', },
  ])
  } else { //个人介绍
    Article.findOne({ type: type }, (Error, data) => {
            if (Error) {
                console.log('Error:' + Error);
                // throw error;
            } else {
                if (data) {
                    data.meta.views = data.meta.views + 1;
                    Article.updateOne({ type: type }, { meta: data.meta })
                        .then(result => {
                          if(filter === 1){
                          const arr = data.comments
                          for (let i = arr.length - 1; i >= 0; i--) {
                              const e = arr[i]
                                if (e.state !== 1) {
                                    arr.splice(i, 1)
                                }
                                const newArr = e.other_comments
                                const length = newArr.length
                                if (length) {
                                    for (let j = length - 1; j >= 0; j--) {
                                        const item = newArr[j]
                                        if (item.state !== 1) {
                                            newArr.splice(j, 1)
                                        }
                                    }
                                }
                            }
                          }
                            responseClient(res, 200, 0, '操作成功 ！', data);
                        })
                        .catch(err => {
                            console.error('err :', err);
                            throw err;
                        });
                } else {
                    responseClient(res, 200, 1, '文章不存在 ！');
                    return;
                }
            }
        })
        .populate([
            { path: 'tag', },
            { path: 'category', },
        ])
}
}
// 删除文章
exports.delArticle = (req, res) => {
  let { id } = req.body;
  Article.deleteMany({ _id: id })
      .then(result => {
          if (result.n === 1) {
              responseClient(res, 200, 0, '删除成功!');
          } else {
              responseClient(res, 200, 1, '文章不存在');
          }
      })
      .catch(err => {
          console.error('err :', err);
          responseClient(res);
      });
};

// 后台文章列表
exports.getArticleListAdmin = (req, res) => {
  let keyword = req.query.keyword || null;
  let state = req.query.state || '';
  let likes = req.query.likes || '';
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;
  let conditions = {};
  const reg = new RegExp(keyword, 'i');
  if (!state) {
      if (keyword) {
          conditions = {
              $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }],
          };
      }
  } else if (state) {
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
          console.log('Error:' + err);
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
          Article.find(conditions, fields, options, (error, result) => {
                  if (err) {
                      console.error('Error:' + error);
                      // throw error;
                  } else {
                      if (likes) {
                          result.sort((a, b) => {
                              return b.meta.likes - a.meta.likes;
                          });
                      }
                      responseData.list = result;
                      responseClient(res, 200, 0, '操作成功！', responseData);
                  }
              })
              .populate([
                { path: 'tag', },
                { path: 'category', },
            ])
      }
  });
};

// 修改文章
exports.updateArticle = (req, res) => {
  const { title, author, keyword, content, desc, img_url, tags, category, state, type, origin, id } = req.body;
  Article.update({ _id: id }, {
          title,
          author,
          keyword: keyword ? keyword.split(',') : [],
          content,
          desc,
          img_url,
          tags: tags ? tags.split(',') : [],
          category: category ? category.split(',') : [],
          state,
          type,
          origin,
      }, )
      .then(result => {
          responseClient(res, 200, 0, '操作成功', result);
      })
      .catch(err => {
          console.error(err);
          responseClient(res);
      });
};

// 删除文章
exports.delArticle = (req, res) => {
  let { id } = req.body;
  Article.deleteMany({ _id: id })
      .then(result => {
          if (result.n === 1) {
              responseClient(res, 200, 0, '删除成功!');
          } else {
              responseClient(res, 200, 1, '文章不存在');
          }
      })
      .catch(err => {
          console.error('err :', err);
          responseClient(res);
      });
};

//文章点赞
exports.likeArticle = (req, res) => {
  let { id } = req.body;
  Article.findOne({_id: id}).then(data => {
    let fields = {};
    data.meta.likes = data.meta.likes + 1;
    fields.meta = data.meta;
    let like_users_arr = data.like_users.length ? data.like_users : [];
    fields.like_users = like_users_arr;
    Article.updateOne({ _id: id }, fields)
    .then(result => {
        responseClient(res, 200, 0, '操作成功！', result);
    })
    .catch(err => {
        console.error('err :', err);
        throw err;
    });
  }).catch(err => {
    responseClient(res);
    console.error('err:', err);
});
}
