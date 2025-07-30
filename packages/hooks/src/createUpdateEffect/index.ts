import { DependencyList, EffectCallback, useRef, type useEffect, type useLayoutEffect } from "react"

type EffectType = typeof useEffect | typeof useLayoutEffect
type EffectHookType = (effect: EffectCallback, deps?: DependencyList) => void

/**
 * createUpdateEffect 是一个高阶函数，用于生成只在依赖更新时（非首次挂载）才执行 effect 的 Hook
 * 基于 useEffect 或 useLayoutEffect 生成对应的“UpdateEffect”版本
 * @param hook 可以是 useEffect 或者 useLayoutEffect，决定副作用的时机
 * @returns 一个新的 effect hook，行为与原生类似，但首次挂载时，不会执行effect
 */
export const createUpdateEffect = (hook: EffectHookType): EffectHookType => {
    return (effect, deps) => {

        const isMounted = useRef(false)
        // hook(() => {
        //     // 组件卸载时，将 isMounted 设为 false，防止内存泄漏或 react-refresh 热更新时状态错误
        //     return () => {
        //         isMounted.current = false
        //     }
        // }, [])
        // React 组件卸载时会自动回收所有 ref ，所以不需要手动去清理，
        // React Fast Refresh 热更新时会正确处理组件状态，
        // 这样反而可能干扰 React 的正常生命周期

        hook(() => {
            // 首次渲染，将 isMounted.current 设置为 true，且不执行 effect
            if (!isMounted.current) {
                isMounted.current = true
            } else {
                // 依赖变化时（非首次时），isMounted.current 已为 true，这时才执行 effect。
                return effect()
            }
        }, deps)

    }
}

export default createUpdateEffect