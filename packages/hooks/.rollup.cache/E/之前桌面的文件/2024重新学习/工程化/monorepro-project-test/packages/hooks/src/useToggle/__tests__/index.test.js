import { act, renderHook } from "@testing-library/react";
import useToggle from "../index";
// import { describe } from "vitest";
// 到 tsconfig.json 配置中加上 "types": ["vitest/globals"]，使ts能够找到vitest定义全局API
var callToggle = function (result) {
    /* react 测试工具函数
    用于包裹所有会触发组件状态更新的操作（如事件触发、异步请求等），
    确保测试与React的更新机制同步执行，
    避免状态更新未被正确处理导致的警告或错误 */
    act(function () {
        /* result.current
        是 React 测试库（如 @testing-library/react-hooks）提供的引用对象，
        始终指向 Hook 的最新返回值,
        在useToggle中定义了结果是返回当前状态和操作对象，return [state, actions];
        所以result.current[1]能够使用useToggle提供的行为 */
        result.current[1].toggle(); // 执行toggle方法
    });
};
/* 自定义 Hook 测试的本质：
‌“调用方法 → 触发状态/行为变更 → 断言结果”‌。
需覆盖‌同步/异步、正常/异常、上下文依赖‌等场景，结合 Vitest 的模拟和断言能力，验证其逻辑可靠性 */
describe('useToggle', function () {
    // 测试场景1：初始化逻辑
    it('toggle on initial', function () {
        var result = renderHook(function () { return useToggle(); }).result; // 不传参初始化
        /* expect API
        在 Vitest 中的核心作用是‌对代码行为是否符合预期进行断言验证‌
        当实际值与匹配器规则冲突时，自动抛出可读性强的错误报告 */
        // 这种是‌链式匹配验证，.toBeFalsy() 相当于 .toBe(false)
        expect(result.current[0]).toBeFalsy(); // 断言初始状态
    });
    // 测试场景2：方法调用测试
    it('test on methods', function () {
        var result = renderHook(function () { return useToggle('Hello'); }).result; // 设置初始值
        expect(result.current[0]).toBe('Hello'); // 验证初始值
        callToggle(result); // 触发toggle方法
        expect(result.current[0]).toBeFalsy(); // 验证触发toggle方法后结果值
        act(function () {
            // 调用setLeft方法
            result.current[1].setLeft();
        });
        expect(result.current[0]).toBe('Hello'); // 验证结果
        act(function () {
            result.current[1].setRight(); // 调用setRight方法
        });
        expect(result.current[0]).toBeFalsy(); // 验证结果
    });
    /* 测试场景3：可选参数测试 */
    it('test on optional', function () {
        var result = renderHook(function () { return useToggle('Hello', 'World'); }).result; // 双参数初始化
        callToggle(result); // 第一次toggle
        expect(result.current[0]).toBe('World'); // 应切换到第二个参数值
        act(function () {
            result.current[1].set('World'); // 显式设置值
        });
        expect(result.current[0]).toBe('World'); // 应保持当前值
        callToggle(result); // 再次toggle
        expect(result.current[0]).toBe('Hello'); // 应切换回第一个参数值
    });
});
//# sourceMappingURL=index.test.js.map