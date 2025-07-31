---
nav:
  path: /hooks
---

# useLocalStorage

专门用于操作浏览器的`localStorage`它提供了:

1. 自动同步 React 状态和 localStorage
2. 可定制的序列化/反序列化、错误处理机制
3. 类型安全的 TypeScript 支持

## 基本用法

<code hideActions='["CSB"]' src="./demo/demo.tsx"></code>

## 存储数组或对象等复杂类型

<code hideActions='["CSB"]' src="./demo/demo2.tsx"></code>

## 自定义序列化/反序列化

<code hideActions='["CSB"]' src="./demo/demo3.tsx"></code>

## API

| 参数名       | 类型   | 必填 | 说明                 |
| ------------ | ------ | ---- | -------------------- |
| key          | string | 是   | localStorage 的键名  |
| defaultValue | any    | 是   | 默认值或默认值的函数 |
| options      | Object | 否   | 配置选项             |

### options 配置项

| 选项名       | 类型                   | 默认值         | 说明               |
| ------------ | ---------------------- | -------------- | ------------------ |
| serializer   | (value: T) => string   | JSON.stringify | 自定义序列化函数   |
| deserializer | (value: string) => T   | JSON.parse     | 自定义反序列化函数 |
| onError      | (error: Error) => void | console.error  | 错误处理函数       |
