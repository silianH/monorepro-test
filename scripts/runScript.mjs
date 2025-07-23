import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import kleur from 'kleur';
import path from 'path';

/**
 *
 * @param {string} scriptName - script名
 * @param {string} pkgLocation - 包所在的目录路径
 * @param {string} args - 额外参数（默认空字符串）
 */
const runScript = (scriptName, pkgLocation, args = '') => {
  // 读取并解析 package.json 文件
  const pkgJson = JSON.parse(readFileSync(`${pkgLocation}/package.json`, 'utf-8'));
  console.log(kleur.bold('来到runScript'), pkgJson.scripts);
  // 检查是否存在指定的脚本
  if (pkgJson.scripts && pkgJson.scripts[scriptName]) {
    console.log(pkgJson.scripts[scriptName]); // 输出脚本内容
    /* 强制指定 npm 路径，防止在根目录调用时，在子项目找不到
    在根目录执行时，由于环境变量或路径配置问题，spawn() 无法定位 npm 命令（报 ENOENT） */
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    // 创建子进程执行npm脚本
    spawn(npmCmd, ['run', scriptName, ...args], {
      stdio: 'inherit', // 继承父进程stdio
      cwd: pkgLocation, // 设置工作目录为包目录
      shell: true, // 确保通过shell解析
    });
  } else {
    console.log(
      kleur.red('✖ ') +
        kleur.bold(`[${path.basename(pkgLocation)}] `) +
        `未找到脚本: "${scriptName}"\n` +
        kleur.dim(`可用脚本: ${Object.keys(pkgJson.scripts || {}).join(', ') || '无'}`),
    );
    process.exitCode = 1; // 设置非零退出码
  }
};

export default runScript;
