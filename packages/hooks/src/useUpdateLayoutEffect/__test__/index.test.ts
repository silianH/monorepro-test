import { act, renderHook } from "@testing-library/react";
import useUpdateLayoutEffect from "..";
import { vi } from 'vitest';
import { useState } from "react";


describe('useUpdateLayoutEffect', () => {
    // 测试用例1：验证首次渲染时不执行effect，以及重新渲染时会触发effect
    it('should run effect on rerender without dependencies', () => {
        // 创建一个jest mock函数来模拟effect
        // 文档：https://vitest.dev/api/mock.html
        const effect = vi.fn()
        // 渲染hook但不传递依赖项数组
        const { rerender } = renderHook(() => useUpdateLayoutEffect(effect))
        // 断言effect没有被调用
        expect(effect).not.toHaveBeenCalled()
        // 手动触发渲染
        rerender()
        // 断言effect被调用一次
        expect(effect).toHaveBeenCalledTimes(1);
    })

    // 测试用例2：验证依赖项变化时触发effect
    it('should run effect when dependencies change', () => {
        const effect = vi.fn()
        const { result } = renderHook(() => {
            const [count, setCount] = useState(0);
            useUpdateLayoutEffect(effect, [count])
            return { count, setCount }
        })
        // 挂载后
        // 断言effect没有被调用
        expect(effect).not.toHaveBeenCalled()
        expect(result.current.count).toBe(0)
        // 设置相同的值，依赖项没有实际变化
        act(() => result.current.setCount(0));
        // 修改状态
        act(() => result.current.setCount(1))
        // 断言effect调用了1次，并且count值变为1
        expect(effect).toHaveBeenCalledTimes(1)
        expect(result.current.count).toBe(1)
    })

    // 测试用例3：证清理函数在卸载时被调用
    it('should run cleanup function on unmount', () => {
        const cleanup = vi.fn()
        // effect 返回清理函数
        const effect = vi.fn(() => cleanup)
        const { rerender, unmount } = renderHook(() => useUpdateLayoutEffect(effect));
        // 因为 useUpdateLayoutEffect 挂载时候并不会执行，cleanup自然也不会正常返回
        // 所以挂在完之后需要手动渲染一次
        rerender()
        // 手动触发卸载
        unmount()
        // 断言 cleanup 被执行了一次
        expect(cleanup).toHaveBeenCalledTimes(1)
    })
})