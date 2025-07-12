/* 启动脚本
npm run start [packageName]
根据传入的包名启动对应项目的npm脚本 */

import { workspace } from './workspace.mjs';
import kleur from 'kleur';
import runScript from './runScript.mjs';

// 目录数组
const { targetDirs } = workspace;
let flag = false; // 用于标记是否找到匹配的包

// 遍历目标目录
for (let i = 0; i < targetDirs.length; i++) {
  const item = targetDirs[i];
  // 检查命令行参数是否匹配目录名，不区分大小写
  if (process.argv.some((arg) => arg.toLowerCase() === item.name.toLowerCase())) {
    flag = true; // 标记找到匹配项
    // 输出启动提示
    console.log(kleur.gray(`【${item.name}】 ${kleur.green('正在启动中...')}`));

    // 特殊处理 playground 目录
    if (targetDirs[i].name === 'playground') {
      runScript('startWeb', item.location); // 执行 startWeb 脚本
    } else {
      console.log(`项目目录：${item.location}`); // 输出项目目录
      runScript('start', item.location); // 执行 start 脚本
    }
  } else {
    // 遍历到最后一项，还没找到匹配目录时，输出错误提示
    if (i === targetDirs.length - 1 && !flag) {
      console.log(
        kleur.red('✖ ') +
          kleur.bold('启动失败') +
          kleur.dim('，建议单独启动一个包，如：') +
          kleur.green('npm run start project-name'),
      );
    }
  }
}
