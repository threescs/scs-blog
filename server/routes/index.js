/**
 * 所有的路由接口
 */
const article = require('./article');
const link = require('./link');
const tag = require('./tag');

module.exports = app => {
  app.post('/addArticle', article.addArticle);
  app.get('/getArticleList', article.getArticleList);
  app.post('/getArticleDetail', article.getArticleDetail);

  app.post('/likeArticle', article.likeArticle);

  app.get('/getLinkList', link.getLinkList);
  app.post('/addLink', link.addLink);

	app.get('/getTagList', tag.getTagList);
  app.post('/addTag', tag.addTag);
  app.post('/delTag', tag.delTag);

}
