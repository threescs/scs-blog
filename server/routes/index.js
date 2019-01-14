/**
 * 所有的路由接口
 */
const article = require('./article');
const link = require('./link');

module.exports = app => {
  app.post('/addArticle', article.addArticle);
  app.get('/getArticleList', article.getArticleList);

  app.get('/getLinkList', link.getLinkList)
}
