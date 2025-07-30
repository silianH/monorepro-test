import { useUpdateLayoutEffect } from 'muggle-hooks';
import { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  useUpdateLayoutEffect(() => {
    console.log('Count updated:', count);
    // 这里可以执行副作用逻辑

    return () => {
      // 清理函数
      console.log('Cleanup for count:', count);
    };
  }, [count]); // 依赖项数组

  return <button onClick={() => setCount((c) => c + 1)}>Increment: {count}</button>;
};
