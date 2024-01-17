# todolist-for-kevinzhang
我使用 nestJS + GraphQL + Prisma + PostgreSQL 建立了 todolist 後端。

我後端比較熟悉 expressJS 及其他非 NodeJS 語言，前端比較熟悉 Vue3.js 及 Android Native。
因此如有任何不符框架精神的設計，還請在 github issue 中多多指教。

## How to start develop server
```bash
make up
```
然後訪問 http://localhost:3000/graphql，即可使用 GraphQL Playground 及文件。

## Stop develop server
```bash
make down
```

## 功能
 - [x] 註冊／登入
 - [ ] 可以多人分享任務的團隊
   > 問題：「團隊」的功能定義？

 - 任務增刪改查
    - [x] 任務建立後可指派執行人及關注人
    - [x] 登入的使用者需要可以看見自己的任務、被指派給自己執行的任務、自己有在關注的任務
    - [ ] 任務的子任務，子任務與任務結構相同，子任務完成後自動完成主任務

   > 1. 任務的結構是樹狀結構，任務可以有多個子任務，子任務可以有多個子任務。
   > 1. 子任務的爸爸一旦建立後就無法改變
   > 1. 任務可指派、也可不指派執行人及關注人，任務的執行人可以是多人，關注人也可以是多人。
   > 1. Created Task 就是 created by self 的 todo-item，這無關於指派與否。
   > 1. All Task 是 Created Task + Assigned Task + Completed Task + Followed Task 的集合。

   > 問題：「子任務完成後自動完成主任務」與 lark 不一致

 - 顯示任務歷史紀錄
    - [x] 可以新增評論在歷史紀錄中
 - [ ] 內容篩選（時段、創作人、任務人）
 - [ ] 支援排序（建立時間、計劃完成時間、創建者、ID）
   > 問題：「ID」的定義？

## 如何實現訊息提醒任務即將到期？

## 如何實現定時重複任務

## 自我要求
 - [後端] 單元測試
 - [後端] GraphQL 欄位註解
 - [前端] 實作 SSR
 - [前端] 實作 Component Test
 - [前端] mock server

## 開發節奏規劃
初期評估起來，在技術尚不熟悉的情況下需要 16 小時。因此從專案的價值面思考，會先做「註冊／登入」、「任務增刪改查」作為第一期交付，「可以多人分享任務的團隊」、「顯示任務歷史紀錄」作為第二期交付。

## 建議
 - 描述這個 todolist 「交付」評分項目。
 例如：
    - 面試者對不熟悉的框架的適應能力
    - 面試者對單元測試的嚴謹度
    - 面試者驗證 request parameters 的嚴謹度
    - 面試者對於 dependence package 的設計及 extensibility 的考慮
 - 在需求中加入實現的優先順序
 - lark 是非常完整的 App，因此面試者在沒有面試官的情況下，不容易掌握開發節奏（相關問題描述於 [功能]）。希望面試官可以實作一個包含所有需求的 static demo page 供未來面試者參考。

[功能]:#功能
