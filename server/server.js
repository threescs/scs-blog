import path from 'path'
import Express from 'express'
import favicon from 'serve-favicon'
import httpProxy from 'http-proxy' //把请求代理转发到其他的服务器
import compression from 'compression'
import connectHistoryApiFallback from 'connect-history-api-fallback' //搭配react-route, react的history模式会出现404各种错误(完美解决)
import config from '../config/config'

const app = new Express();
const port = config.port;

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    targer: targetUrl
})
app.use('/api',(req, res) => {
    proxy.web(req, res,{target: targetUrl}) //被代理到 127.0.0.1:3030
})

app.use('/', connectHistoryApiFallback());
app.use('/', Express.static(path.join(__dirname, '..', 'build')));
app.use('/', Express.static(path.join(__dirname, '..', 'static')));

// 服务器的请求压缩
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'scs.ico')));


//热更新 
if(process.env.NODE_ENV!=='production') {
    const Webpack = require('webpack');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.dev');

    const compiler = Webpack(webpackConfig);

    app.use(WebpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: {colors: true},
        lazy: false
    }));
    app.use(WebpackHotMiddleware(compiler));
}

app.listen(port, (err) => {
    if(err) {
        console.error(err)
    } else {
        console.log(`===> open http://${config.host}:${config.port} in a browser to view the app`)
    }
})