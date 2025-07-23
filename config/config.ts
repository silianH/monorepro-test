import { menus } from './hooks';

// const packages = require('../packages/hooks/package.json');

export default {
    // 配置 html 的输出形式，默认只输出 index.html。
    exportStatic: {},
    // 设置 node_modules 目录下依赖文件的编译方式。
    nodeModulesTransform: {
        type: 'none', //all 前者速度较慢，但可规避常见的兼容性等问题，后者反之。
        exclude: [],
    },
    publicPath: './',
    history: { type: 'hash' },
    // 配置额外的 babel 插件。
    extraBabelPlugins: [
        [
            'babel-plugin-import', // 按需引入
            {
                libraryName: '@alifd/next',
                style: false,
            },
            'fusion',
        ],
    ],
    // 用于设定文档的展现模式，默认为文档模式，配置为 site 时可无缝切换为站点模式。
    mode: 'site',
    title: 'Muggle React Hooks',
    // 是否启用按需加载，即是否把构建产物进行拆分，在需要的时候下载额外的 JS 再执行。
    dynamicImport: {},
    manifest: {},
    hash: true,
    // 文档中代码功能演示 通过alias 找到资源 进行调用
    // 配置别名，对引用路径进行映射。
    alias: {
        muggleHooks: process.cwd() + '/packages/hooks/src/index.ts',
    },
    resolve: {
        includes: ['docs', 'packages/hooks/src'],
    },
    links: [
        {
            rel: 'stylesheet',
            href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
        },
        { rel: 'stylesheet', href: '/style.css' },
    ],
    navs: [
        { title: '指南', path: '/guide' },
        { title: 'Hooks', path: '/hooks' },
    ],
    menus: {
        '/': [
            {
                title: '首页',
                path: 'index',
            },
        ],
        '/guide': [
            {
                title: '介绍',
                path: '/guide',
            },
        ],
        '/hooks': menus,
    },
};