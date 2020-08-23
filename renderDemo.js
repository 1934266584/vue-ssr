// 创建一个Vue实例
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const app = new Vue({
  template: `<div>Hello World</div>`
});

// 将 Vue实例渲染成 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err;
  console.log(html);
  // => <div data-server-rendered="true">Hello World</div>
})

// 在2.5.0+,没有传入回调函数，则会返回 Promise: 
renderer.renderToString(app).then(html => {
  console.log(html);
}).catch(err => {
  throw err
})

