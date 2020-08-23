// 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。

import { createApp } from './app';

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。

  // const { app } = createApp();
  // return app
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    // 设置服务器端 router的位置
    router.push(context.url);

    // 等到router将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchComponents = router.getMatchedComponents();
      // 匹配不到路由， 执行reject函数， 并返回 404
      if (matchComponents.length) {
        return reject({ code: 404 });
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      Promise.all(matchComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        resolve(app)
      })

      // resolve(app)
    }, reject)
  })
}

// 假设服务器 bundle 已经完成构建（ 请再次忽略现在的构建设置）
const createApp = require('/path/to/built-server-bundle.js')

server.get('*', (req, res) => {
  const context = {
    url: req.url
  }

  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  })
})
