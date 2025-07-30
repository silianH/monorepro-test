---
nav:
  path: /hooks
---

# useUpdateEffect

模仿了 useEffect 的行为，但会跳过首次渲染时的执行。
这个 Hook 特别适用于那些只需要在组件更新时执行副作用逻辑，而不需要在初始挂载时执行的场景。

## 基本用法

<code hideActions='["CSB"]' src="./demo/demo.tsx"></code>

## API

API 与 `React.useEffect` 完全一致。

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
