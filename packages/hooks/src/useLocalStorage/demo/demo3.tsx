import { useLocalStorageState } from 'muggle-hooks';

// 自定义序列化函数
function customSerialize(obj) {
    
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  // 处理特殊对象类型
  if (obj instanceof Date) {
    return `{"__type__":"Date","__value__":"${obj.toISOString()}"}`;
  }

  if (obj instanceof RegExp) {
    return `{"__type__":"RegExp","__source__":"${obj.source}","__flags__":"${obj.flags}"}`;
  }

  if (obj instanceof Set) {
    return JSON.stringify({ __type__: 'Set', __value__: Array.from(obj) });
  }

  // 处理普通对象和数组
  const serialized = {};
  for (const key in obj) {
    serialized[key] = customSerialize(obj[key]);
  }

  return JSON.stringify(serialized);
}

// 自定义反序列化函数
function customDeserialize(str) {
  const parsed = JSON.parse(str);

  // 处理基本类型
  if (parsed === null || typeof parsed !== 'object') {
    return parsed;
  }

  // 处理特殊对象类型
  if (parsed.__type__ === 'Date') {
    return new Date(parsed.__value__);
  }

  if (parsed.__type__ === 'RegExp') {
    return new RegExp(parsed.__source__, parsed.__flags__);
  }
  if (parsed.__type__ === 'Set') {
    return new Set(parsed.__value__);
  }

  // 处理普通对象和数组
  const result = Array.isArray(parsed) ? [] : {};
  for (const key in parsed) {
    result[key] = customDeserialize(parsed[key]);
  }

  return result;
}
export default function demo2() {
  const [userData, setUserData] = useLocalStorageState(
    'muggle-local-storage-demo3',
    {
      name: 'Muggle',
      lastLogin: new Date(),
      permissions: new Set(['read', 'write']),
    },
    { serializer: customSerialize, deserializer: customDeserialize },
  );
  const updateLogin = () => {
    setUserData((arg) => ({
      ...arg,
      lastLogin: new Date(),
    }));
  };
  return (
    <>
      <p>Name: {userData.name}</p>
      <p>Last login: {userData.lastLogin.toString()}</p>
      <p>Permissions: {Array.from(userData.permissions).join(', ')}</p>
      <button onClick={updateLogin}>Update Login Time</button>
    </>
  );
}
