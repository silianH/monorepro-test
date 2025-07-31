/**
 * title: 将 state 存储在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import { useLocalStorageState } from 'muggle-hooks';

export default function () {
  const [message, setMessage] = useLocalStorageState('muggle-local-storage-demo1', 'Hello~');
  return (
    <>
      <input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button style={{ margin: '0 8px' }} type="button" onClick={() => setMessage('Hello~')}>
        Reset
      </button>
      <button type="button" onClick={() => setMessage(undefined)}>
        Clear
      </button>
    </>
  );
}
