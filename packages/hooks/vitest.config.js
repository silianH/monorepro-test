import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // 模拟浏览器环境
    globals: true, // 可以使用vitest提供的全局的API，无需导入
    setupFiles: ['./tests/setup.ts'], // 配置文件
    coverage: {
      provider: 'istanbul', // 覆盖率分析工具
      reporter: ['text', 'json', 'html'], // 覆盖率报告
      include: ['src/**/*.ts'], // 分析文件的范围
    },
    // ...
  },
});
