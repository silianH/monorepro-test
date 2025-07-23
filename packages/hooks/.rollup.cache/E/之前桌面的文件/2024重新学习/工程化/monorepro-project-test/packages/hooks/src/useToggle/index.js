import { useMemo, useState } from 'react';
// Hook 实现
function useToggle(defaultValue, reverseValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    // 使用 useState 管理状态，初始值为 defaultValue
    var _a = useState(defaultValue), state = _a[0], setState = _a[1];
    // 使用 useMemo 缓存操作函数，避免每次渲染都重新创建
    var actions = useMemo(function () {
        // 计算反向值：如果没有提供 reverseValue，则取 defaultValue 的逻辑非
        var reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue);
        // 定义切换函数：当前值是 defaultValue 则切换到 reverseValueOrigin，反之亦然
        var toggle = function () { return setState(function (s) { return (s === defaultValue ? reverseValueOrigin : defaultValue); }); };
        // 定义直接设置函数：可以设置任意值
        var set = function (value) { return setState(value); };
        // 设置到默认值
        var setLeft = function () { return setState(defaultValue); };
        // 设置到反向值
        var setRight = function () { return setState(reverseValueOrigin); };
        return {
            toggle: toggle,
            set: set,
            setLeft: setLeft,
            setRight: setRight,
        };
    }, []); // 空依赖数组确保这些函数只创建一次
    // 返回当前状态和操作对象
    return [state, actions];
}
export default useToggle;
//# sourceMappingURL=index.js.map