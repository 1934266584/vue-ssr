// 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中：

import { createApp } from './app';

// 客户端特定引导逻辑……

const { app } = creatApp();

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')


// 异步组件实现方式
// entry-client.js

import { createApp } from './app'

const { app, router } = createApp()
// 需要在挂载 app 之前调用 router.onReady
router.onReady(() => {
  app.$mount('#app')
})

// 而在客户端， 在挂载到应用程序之前， store 就应该获取到状态
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})