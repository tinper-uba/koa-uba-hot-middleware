/**
 * koa2 hot middleware for uba-server
 * Version  : v1.0.0
 * Author   : Kvkens(yueming@yonyou.com)
 * Date     : 2017-12-26 18:52:18
 */

const webpackHot = require('webpack-hot-middleware');
const PassThrough = require('stream').PassThrough;

/**
 * hot Middleware
 * @param {*} compiler 
 * @param {*} opts 
 */
const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHot(compiler, opts);
  return async(ctx, next) => {
    let stream = new PassThrough();
    await middleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.body = stream;
        ctx.status = status;
        ctx.set(headers);
      }
    }, next);
  }

}


module.exports = hotMiddleware;
