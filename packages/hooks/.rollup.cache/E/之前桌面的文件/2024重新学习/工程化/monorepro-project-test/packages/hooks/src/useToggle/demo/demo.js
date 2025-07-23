import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// import useToggle from '..';
// 需要去根目录tsconfig.json 中的 paths 配置好对应的目录
import { useToggle } from 'muggle-hooks';
export default (function () {
    var _a = useToggle(), state = _a[0], _b = _a[1], toggle = _b.toggle, setLeft = _b.setLeft, setRight = _b.setRight;
    return (_jsxs("div", { children: [_jsxs("p", { children: ["Effects\uFF1A", "".concat(state)] }), _jsxs("p", { children: [_jsx("button", { type: "button", onClick: toggle, children: "Toggle" }), _jsx("button", { type: "button", onClick: setLeft, style: { margin: '0 8px' }, children: "Toggle False" }), _jsx("button", { type: "button", onClick: setRight, children: "Toggle True" })] })] }));
});
//# sourceMappingURL=demo.js.map