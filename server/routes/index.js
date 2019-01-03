/**
 * 所有的路由接口
 */
const article = require('./article');

module.exports = app => {
  app.post('/addArticle', article.addArticle);
  app.get('/getArticleList', article.getArticleList);
}
