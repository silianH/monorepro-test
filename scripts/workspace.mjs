/* 扫描项目目录结构，收集工作区中的应用程序和包的信息 */
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import fs from 'fs-extra';
// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在目录
const __dirname = path.dirname(__filename);
// 解析packages目录的绝对路径（相当于当前文件所在目录的上层目录）
const packagesDir = path.resolve(__dirname, '../packages');
// 读取packages目录下的所有文件和文件夹名称
const publishPackages = readdirSync(packagesDir);

// 将packages目录下的每个项目转换为绝对路径
const packageDirs = publishPackages.map((p) => path.resolve(packagesDir, p));

// 获取项目根目录的绝对路径（当前文件所在目录的上层目录）,方便后续返回出去，给外部使用
const dirName = path.resolve(__dirname, '../');

const appsDir = path.resolve(dirName, 'apps');

// 读取apps目录，并过滤出其中的目录
const appFolders = readdirSync(appsDir).filter((file) => {
  // path.join(appsDir, file) → 拼接完整路径
  // .isDirectory() → 判断是否为目录
  return statSync(path.join(appsDir, file)).isDirectory();
});

// 讲apps目录下的每个应用转成对象数组，包括名称和位置信息
const appsDirs = appFolders.map((name) => {
  return {
    name,
    location: `${appsDir}/${name}`,
  };
});
// console.log(appsDirs, 'appsDirs');

// 将packages目录下的每个包转成对象数组，包括名称和位置信息
const pkgDirs = publishPackages.map((name, index) => {
  return {
    name,
    location: packageDirs[index], // 包目录的绝对路径
  };
});
// console.log(pkgDirs, 'pkgDirs');

// console.log('targetDirs', [...appsDirs, ...pkgDirs]);

// 导出工作区配置对象，包含所有应用和包信息
export const workspace = {
  packageDirs,
  packages: publishPackages,
  dirName,
  targetDirs: [...appsDirs, ...pkgDirs],
};
