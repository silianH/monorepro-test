import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
afterEach(function () {
    // 每个测试用例执行后清理渲染的组件
    cleanup();
});
//# sourceMappingURL=setup.js.map