// @ts-nocheck
import { createHashHistory, History } from 'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/node_modules/.pnpm/@umijs+runtime@3.5.43_react@18.2.0/node_modules/@umijs/runtime';

let options = {
  "basename": "/"
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: History = process.env.__IS_SERVER ? null : createHashHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createHashHistory(options);
  }

  return history;
};

export { history };
