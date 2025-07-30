/**
 * desc: useMemoizedFn 与 useCallback 可以实现同样的效果。
 */

import React, { useState, useCallback } from 'react';
import { useMemoizedFn } from 'muggle-hooks';

export default () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    alert(`Current count is ${count}, in useCallback`);
  }, [count]);

  const memoizedFn = useMemoizedFn(() => {
    alert(`Current count is ${count}, in useMemoizedFn`);
  });

  return (
    <>
      <p>count: {count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Add Count
      </button>
      <div style={{ marginTop: 12 }}></div>
      <button type="button" onClick={callbackFn}>
        call callbackFn
      </button>
      <button type="button" onClick={memoizedFn} style={{ marginLeft: 8 }}>
        call memoizedFn
      </button>
    </>
  );
};
