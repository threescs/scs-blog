/**
 * 所有的路由接口
 */
const article = require('./article');
const link = require('./link');
const tag = require('./tag');
const category = require('./category');

module.exports = app => {
  app.post('/addArticle', article.addArticle);
  app.post('/delArticle', article.delArticle);
  app.post('/updateArticle', article.updateArticle);
	app.post('/delArticle', article.delArticle);
  app.get('/getArticleList', article.getArticleList);
  app.get('/getArticleListAdmin', article.getArticleListAdmin);
  app.post('/getArticleDetail', article.getArticleDetail);

  app.post('/likeArticle', article.likeArticle);

  app.get('/getLinkList', link.getLinkList);
  app.post('/addLink', link.addLink);

	app.get('/getTagList', tag.getTagList);
  app.post('/addTag', tag.addTag);
  app.post('/delTag', tag.delTag);

  app.post('/addCategory', category.addCategory);
	app.post('/delCategory', category.delCategory);
	app.get('/getCategoryList', category.getCategoryList);
}
