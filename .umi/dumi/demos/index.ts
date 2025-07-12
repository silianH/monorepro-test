// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';
import rawCode1 from '!!dumi-raw-code-loader!E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/packages/hooks/src/useToggle/demo/demo.tsx?dumi-raw-code';
import rawCode2 from '!!dumi-raw-code-loader!E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/packages/hooks/src/useToggle/index.ts?dumi-raw-code';

export default {
  'usetoggle-demo': {
    component: dynamic({
      loader: async () => (await import(/* webpackChunkName: "demos_no_comp" */'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/packages/hooks/src/useToggle/demo/demo.tsx')).default,
      loading: () => null,
    }),
    previewerProps: {"sources":{"_":{"tsx":rawCode1},"index.ts":{"import":"..","content":rawCode2}},"dependencies":{"react":{"version":"18.2.0"}},"title":"基础用法","description":"<div class=\"markdown\"><p>默认为 boolean 切换，基础用法与 useBoolean 一致。</p></div>","identifier":"usetoggle-demo"},
  },
};
