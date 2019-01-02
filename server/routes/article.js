import Article from '../models/article';
import { responseClient } from '../util';

exports.addArticle = (req, res) => {
  const {title, author, keyword, content, desc, img_url, tags, category, state, type, origin } = req.body;
  let tempArticle = null;
  tempArticle = new Article({
    title,
    author,
    keyword: keyword ? keyword.split(',') : [],
    content,
    numbers: content.length,
    desc,
    img_url,
    tags: tags ? tags.split(',') : [],
    category: category ? category.split(',') : [],
    state,
    type,
    origin,
  })
}
tempArticle.save().then(data => {
  responseClient(res, 200, 0, '保存成功', data)
}).catch(err => {
  console.log(err);
  responseClient(res);
})
