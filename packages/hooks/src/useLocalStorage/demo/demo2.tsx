/**
 * desc: useLocalStorageState 会自动处理序列化和反序列化的操作。
 */

import { useLocalStorageState } from 'muggle-hooks';
const array = [66, 77, 69, 78];
export default function demo2() {
  const [value, setValue] = useLocalStorageState('muggle-local-storage-demo2', array);
  return (
    <>
      <button onClick={() => setValue([...value, Math.floor(Math.random() * 90) + 10])}>
        push random
      </button>
      <button type="button" onClick={() => setValue(array)}>
        reset
      </button>
      <p>{value?.join(' ~ ')}</p>
    </>
  );
}
