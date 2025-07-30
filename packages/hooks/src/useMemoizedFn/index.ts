import { useMemo, useRef } from "react";

// 泛指任意函数类型，空操作函数，可以接受任意参数但什么都不做
type noop = (this: any, ...args: any[]) => any
// 通过约束 T 为函数类型，避免了传入非函数值（如数字、对象等）导致的运行时错误‌

// PickFunction<T> 其实就是“重新声明一个和 T 完全一样签名的函数类型”，包括 this、参数、返回值。
type PickFunction<T extends noop> = (
    // 这是 TypeScript 的内置类型工具，用于提取函数 T 的 this 类型
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T>;

/**
 * useMemoizedFn 解决函数引用频繁变化导致的性能问题（如子组件无效重渲染）和闭包陷阱问题‌
 * @param fn 函数
 * @returns 返回一个引用稳定的函数，但内部逻辑始终保持最新
 */
// function useMemoizedFn<T extends (this: any, ...args: any[]) => any>(fn: T) {
export default function useMemoizedFn<T extends noop>(fn: T) {
    // useRef 返回的对象在组件整个生命周期内不会变，即 fnRef 和 memoizedFn 的引用始终不变
    const fnRef = useRef<T>(fn)
    /* 为什么不直接使用 fnRef.current = fn , https://github.com/alibaba/hooks/issues/728
    在 render 阶段直接修改 ref（同步赋值）可能导致闭包环境不一致，尤其在并发模式下更易暴露问题
    在 React DevTools 调试时，直接通过 fnRef.current = fn 更新 ref 会导致函数闭包捕获旧值，表现为：
     - 计数器组件中，点击按钮后计数不更新
     - 仅在 DevTools 选中组件时触发（与 React 内部渲染机制相关） */

    /* ‌通过 fnRef.current = useMemo(() => fn, [fn]) 能稳定闭包环境
     - 引用一致性‌：useMemo 会对比依赖项 [fn]，仅在 fn 变化时返回新引用，否则复用之前的函数。
       即使多次渲染，只要 fn 逻辑不变，fnRef.current 的闭包环境也不会被破坏。
     - 同步执行的特性‌：useMemo 在渲染阶段同步执行，确保 fnRef.current 在每次渲染后立即更新，
       但又能通过依赖比对避免不必要的重新赋值 */

    // 用 useMemo 包裹，确保只有当 fn 变化时才更新 fnRef.current
    // 这样可以避免闭包陷阱和不必要的赋值。 但 fnRef.current 的值可以随时改变。
    fnRef.current = useMemo(() => fn, [fn])

    const memoizedFn = useRef<PickFunction<T>>(null)
    // 确保 memoizedFn 只在首次渲染时赋值，之后始终保持同一个函数引用
    if (!memoizedFn.current) {
        // 创建稳定引用的函数，避免每次渲染时重新创建函数
        memoizedFn.current = function (this, ...args) {
            return fnRef.current.apply(this, args)
        }
    }

    return memoizedFn.current as T
}