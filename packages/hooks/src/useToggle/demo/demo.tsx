/**
 * title: 基础用法
 * desc: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
// import useToggle from '..';
// 需要去根目录tsconfig.json 中的 paths 配置好对应的目录
import { useToggle } from 'muggle-hooks';

export default () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();

  return (
    <div>
      <p>Effects：{`${state}`}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
          Toggle False
        </button>
        <button type="button" onClick={setRight}>
          Toggle True
        </button>
      </p>
    </div>
  );
};
