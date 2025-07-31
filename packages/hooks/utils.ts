/**
 * 生产环境级函数检测方法
 * @param value 待检测值
 * @returns 是否为可执行函数
 */
export const isFunction = (value: unknown): value is (...args: any[]) => any => {
    // 1. 基础类型快速过滤
    if (typeof value !== 'function' && typeof value !== 'object') return false;

    // 2. 原型链检测（覆盖异步函数/生成器/Proxy等）
    const fnStr = Object.prototype.toString.call(value);
    return [
        '[object Function]',
        '[object AsyncFunction]',
        '[object GeneratorFunction]',
        '[object Proxy]'
    ].includes(fnStr);
}


export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined';

export const isBrowser = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);