---
nav:
  path: /hooks
---

# useMemoizedFn

useMemoizedFn 用于持久化函数引用，同时保持函数内部逻辑的最新性。它解决了以下问题：

1. 保持函数引用不变（避免子组件不必要的重渲染）
2. 确保函数内部逻辑始终是最新版本
3. 自动处理 this 绑定问题

在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。
而使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化

```javascript
const [count, setCount] = useState(0);

// 使用 useMemoizedFn 包裹需要持久化的函数
const handleClick = useMemoizedFn(() => {
  console.log('Current count:', count);
  setCount((c) => c + 1);
});
```

## 基本用法

<code hideActions='["CSB"]' src="./demo/demo1.tsx"></code>

## 定时器/事件监听回调

<code hideActions='["CSB"]' src="./demo/demo2.tsx"></code>

## 性能提升

- 普通函数：每次父组件渲染都会导致重新渲染
- useCallback：仅在count变化时重新渲染
- useMemoizedFn：永远不会因函数引用变化而重新渲染

<code hideActions='["CSB"]' src="./demo/demo3.tsx"></code>

## API

```javascript
const fn = useMemoizedFn<T>(fn: T): T;
```

### Params

| 参数 | 说明             | 类型                      | 默认值 |
| ---- | ---------------- | ------------------------- | ------ |
| fn   | 需要持久化的函数 | `(...args: any[]) => any` | -      |

### Result

| 参数 | 说明                      | 类型                      |
| ---- | ------------------------- | ------------------------- |
| fn   | 引用地址永远不会变化的 fn | `(...args: any[]) => any` |
