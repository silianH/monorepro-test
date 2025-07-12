import path from 'path'
// import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
// 官方文档 https://cn.vitejs.dev/config/
import dts from 'vite-plugin-dts'
// 专为 ‌Vite 库模式‌设计的插件，主要用于 ‌自动生成 TypeScript 声明文件（.d.ts)‌，解决库开发中的类型定义问题
export default defineConfig({
    plugins: [dts()],
    // 规范打包内容
    build: {
        lib: {
            // entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            entry: path.resolve(__dirname, 'src/index.ts'),
            // 约束打包后的类型
            formats: ["cjs", "umd", 'es'],
            /* name 必须定义，不然打包会报错 
            定义后，生成的 JS 文件会暴露一个全局变量（如 window.MyLib） */
            name: 'muggleLib',
            fileName: (format) => `index-lib.${format}.js`
        }
    }

})