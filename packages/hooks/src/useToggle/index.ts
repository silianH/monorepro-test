import { useMemo, useState } from 'react';
// 状态值切换 hook

// 定义操作接口，包含四个操作方法
export interface Actions<T> {
    setLeft: () => void // 设置为默认值
    setRight: () => void // 设置为反向值
    set: (value: T) => void // 手动设置任意值
    toggle: () => void // 切换当前状态
}

/* TypeScript 特有的函数重载(Overload)写法
允许为同一个函数提供多个类型声明，以支持不同的参数组合和返回类型 */

// 1. 无参数调用，默认使用boolean类型，初始值为false
function useToggle<T = boolean>(): [boolean, Actions<T>];

// 2. 提供默认值调用，返回与默认值相同类型的值
function useToggle<T>(defaultValue: T): [T, Actions<T>];

// 3. 提供默认值和反向值调用，返回两者联合类型的值
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];


// Hook 实现
function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
    // 使用 useState 管理状态，初始值为 defaultValue
    const [state, setState] = useState<D | R>(defaultValue);

    // 使用 useMemo 缓存操作函数，避免每次渲染都重新创建
    const actions = useMemo(() => {
        // 计算反向值：如果没有提供 reverseValue，则取 defaultValue 的逻辑非
        const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

        // 定义切换函数：当前值是 defaultValue 则切换到 reverseValueOrigin，反之亦然
        const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));

        // 定义直接设置函数：可以设置任意值
        const set = (value: D | R) => setState(value);

        // 设置到默认值
        const setLeft = () => setState(defaultValue);

        // 设置到反向值
        const setRight = () => setState(reverseValueOrigin);

        return {
            toggle,
            set,
            setLeft,
            setRight,
        };
    }, []); // 空依赖数组确保这些函数只创建一次

    // 返回当前状态和操作对象
    return [state, actions];
}

export default useToggle;