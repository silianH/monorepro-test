import { useState } from "react"
import useMemoizedFn from "../useMemoizedFn";
import useUpdateEffect from "../useUpdateEffect"
import { isFunction, isUndef } from "../../utils"

export type SetState<S> = S | ((prevState?: S) => S);

interface Options<T> {
    onError?: (error: Error) => void;
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
}

/**
 * 高阶 Hook 工厂函数 createUseStorageState，
 * 用于生成一个用于操作 Web Storage（如 localStorage 或 sessionStorage）的自定义 React Hook
 * @param storage 存储对象（localStorage/sessionStorage），服务端时传null
 * @returns 返回一个可复用的状态 Hook
 */
export default function createUseStorageState<T = any>(storage: Storage | null) {

    /* T 作为泛型参数，表示存储状态的‌具体数据类型‌。在使用 Hook 时，TypeScript 会根据传入的 defaultValue 自动推断类型 */
    return function useStorageState(key: string, defaultValue: T | (() => T), options?: Options<T>): [T, (value: SetState<T>) => void] {

        // const onError = (e) => console.error(e)
        // // 序列化/反序列化
        // const serializer = (value: T) => JSON.stringify(value)
        // const deserializer = (value: string): T => JSON.parse(value)
        // 将这些功能作为可配置项
        const {
            serializer = (value: T) => JSON.stringify(value),
            deserializer = (value: string): T => JSON.parse(value),
            onError = (e) => console.error(e)
        } = options || {};

        // 状态初始化
        function getStoreValue() {
            try {
                const raw = storage.getItem(key)
                if (raw) return deserializer(raw)
            } catch (err) {
                onError(err)
            }

            // 如果是函数返回执行结果
            if (isFunction(defaultValue)) return defaultValue()

            // 以上情况都不属于，单纯返回 defaultValue
            return defaultValue
        }
        const [state, setState] = useState<T | null>(() => getStoreValue())

        // 监听key 更新，首次不处理
        useUpdateEffect(() => {
            setState(getStoreValue())
        }, [key])

        // 更新状态方法
        const updateState = (value?: SetState<T>) => {
            const currentState = isFunction(value) ? value(state) : value
            setState(currentState)

            if (isUndef(currentState)) {
                storage?.removeItem(key)
            } else {
                try {
                    storage?.setItem(key, serializer(currentState))
                } catch (err) {
                    onError(err)
                }
            }

        }

        // 清除存储的方法
        const removeState = () => {
            try {
                storage?.removeItem(key)
            } catch (err) {
                onError(err)
            }
        }

        // as const  保证元组类型推断
        return [state, useMemoizedFn(updateState)] as const
    }

}