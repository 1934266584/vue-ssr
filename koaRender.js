const Koa = require('koa');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const app = new Koa();

app.use(async ctx => {
  const app = new Vue({
    data: {
      url: ctx.request.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  const html = await renderer.renderToString(app);
  ctx.body = html;
});

app.listen(3000);