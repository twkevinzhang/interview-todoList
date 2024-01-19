# web
## environment
 - node.js: 20.9
 - typescript: 5.3.3
 - react.js and react-dom: 18.2.18
 - @typescript-eslint/*: 6.18.1

## 工具描述
 - 使用 codegen 及 apollo client 產生用於串接後端 GraphQL API 的 useHooks 及 schema interface typescript code
 - 使用 Next.js 作為 SSR 框架

## 啟動
copy .env.example to .env then
```
pnpm install
pnpm dev
```

## 可以改善的地方
 - [ ] 無障礙及鍵盤操作
 - [ ] useHooks 單元測試
 - [ ] 實作 Storybook
 - [ ] 使用 [nx] 作為 monorepo 管理工具

## 學習
 - 在已經了解 React.js 的前提下學習 [nest.js] 及其 App Router

[nest.js]: https://nextjs.org/learn/dashboard-app
[nx]: https://ithelp.ithome.com.tw/articles/10336883
