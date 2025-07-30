/**
 * desc: 依赖项可以安全使用 tick，因为引用稳定
 */

import { useState, useEffect } from 'react';
import { useMemoizedFn } from 'muggle-hooks';

export default () => {
  const [seconds, setSeconds] = useState(0);

  const tick = useMemoizedFn(() => {
    setSeconds((s) => s + 1);
  });

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]); // 依赖项可以安全使用 tick，因为引用稳定

  return <div>Seconds: {seconds}</div>;
};
