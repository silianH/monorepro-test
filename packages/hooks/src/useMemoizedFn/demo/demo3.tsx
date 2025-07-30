import React, { useState, useCallback, memo } from 'react';
import { useMemoizedFn } from 'muggle-hooks';

// 带渲染计数器的子组件
const RenderCounter = memo(({ onClick, name }: { onClick: () => void; name: string }) => {
  const renderCount = React.useRef(0);
  renderCount.current++;

  return (
    <div style={{ padding: '6px 6px 6px 0', margin: '8px 0' }}>
      <strong>{name}</strong>
      <p style={{ display: 'inline-block', margin: '0 8px' }}>
        渲染次数: <strong style={{ color: 'red' }}>{renderCount.current}</strong>
      </p>
      <button onClick={onClick}>触发回调</button>
    </div>
  );
});

export default function Demo() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // 普通函数（每次渲染都新建）
  const normalFn = () => alert(`'普通函数执行', count: ${count}`);

  // useCallback（依赖变化时重建）
  const callbackFn = useCallback(() => {
    alert(`'useCallback执行', count: ${count}`);
  }, [count]);

  // useMemoizedFn（永久稳定）
  const memoizedFn = useMemoizedFn(() => {
    alert(`'useMemoizedFn执行', count: ${count}`);
  });

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setCount((c) => c + 1)}>Count +1 ({count})</button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入内容触发父组件渲染"
          style={{ marginLeft: 8 }}
        />
      </div>

      <RenderCounter name="normal" onClick={normalFn} />
      <RenderCounter name="useCallback" onClick={callbackFn} />
      <RenderCounter name="useMemoizedFn" onClick={memoizedFn} />
    </>
  );
}
