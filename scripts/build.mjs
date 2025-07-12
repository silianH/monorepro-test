/**
 * 构建脚本
 */

import kleur from 'kleur';
import { workspace } from './workspace.mjs';
import runScript from './runScript.mjs';

// 从workspace解构出包目录、包名称和基础目录
const { packageDirs, packages, dirName } = workspace;

// 自定义目录配置，给后续的通用hooks目录，以及站点
const customDirs = ['demo-components', 'playground', 'website'].map((name) => {
  return {
    location: `${dirName}/${name}`, // 拼接完整路径
    name, // 保留目录名
  };
});

// 创建包目录配置（动态映射）
const pkgDirs = packages.map((name, index) => {
  return {
    location: packageDirs[index], // 获取对应路径
    name,
  };
});

/**
 * 获取待构建任务（核心逻辑）
 * 1. 合并所有可能的构建目标
 * 2. 检查命令行参数是否指定特定构建目标
 * 3. 无参数时返回全部目标
 */
const getBuildTask = () => {
  //   const totalBuilTasks = [...pkgDirs, ...customDirs];
  const totalBuilTasks = [...pkgDirs];
  // 过滤出命令行参数匹配的任务
  //   process.argv.some((arg) => arg.toLowerCase() === item.name.toLowerCase())
  let _tasks = totalBuilTasks.filter((item) =>
    process.argv.map((arg) => arg.toLowerCase().includes(item.name.toLowerCase())),
  );

  // 无匹配时返回全部任务
  if (_tasks.length === 0) _tasks = totalBuilTasks;
  return _tasks;
};

(() => {
  // 获取构建任务列表
  const buildTasks = getBuildTask();
  if (buildTasks.length === 0) {
    console.log(
      kleur.red('✖ ') +
        kleur.bold('构建失败') +
        kleur.dim('，构建任务为空！请尝试执行：') +
        kleur.green('npm run build:dev'),
    );
  }
  // 执行所有构建任务
  buildTasks.forEach((taskInfo, index) => {
    console.log('当前构建进度：' + kleur.bold().green(`${buildTasks.length}/${index + 1}`));
    console.log(kleur.blue(`【${taskInfo.name}】 ${kleur.green('正在构建中...')}`));
    if (taskInfo.name === 'playground') {
      runScript('buildWeb', taskInfo.location);
    } else {
      runScript('build', taskInfo.location);
    }
  });
})();
