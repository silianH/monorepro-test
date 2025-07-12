// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/node_modules/.pnpm/@umijs+runtime@3.5.43_react@18.2.0/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout')})],
    "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ 'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/node_modules/.pnpm/@umijs+preset-dumi@1.1.48_y2lnwjxl5fxb6etkz2yxjqvzjq/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { usePrefersColor, context } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          },
          loading: () => null,
        }))()
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout')}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/node_modules/.pnpm/dumi-theme-default@1.1.24_cd6uoz24gmvk364ak7f74brzna/node_modules/dumi-theme-default/es/layout.js')})],
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/docs/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1752240697023,
          "title": "首页",
          "hero": {
            "image": "/react.png",
            "desc": "<div class=\"markdown\"><p>React 业务通用 Hooks 库</p></div>",
            "actions": [
              {
                "text": "介绍",
                "link": "/guide"
              },
              {
                "text": "Hooks 列表",
                "link": "/hooks"
              }
            ]
          },
          "slugs": [
            {
              "depth": 2,
              "value": "✨ 特性",
              "heading": "-特性"
            },
            {
              "depth": 2,
              "value": "📦 安装",
              "heading": "-安装"
            },
            {
              "depth": 2,
              "value": "🔧 使用",
              "heading": "-使用"
            }
          ]
        },
        "title": "首页 - Muggle React Hooks"
      },
      {
        "path": "/guide",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__index.md' */'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/docs/guide/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/index.md",
          "updatedTime": 1752240867399,
          "slugs": [],
          "nav": {
            "path": "/guide",
            "title": "Guide"
          },
          "title": "Guide"
        },
        "title": "Guide - Muggle React Hooks"
      },
      {
        "path": "/use-toggle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useToggle__index.md' */'E:/之前桌面的文件/2024重新学习/工程化/monorepro-project-test/packages/hooks/src/useToggle/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useToggle/index.md",
          "updatedTime": 1752279253946,
          "slugs": [
            {
              "depth": 1,
              "value": "useToggle",
              "heading": "usetoggle"
            },
            {
              "depth": 2,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 2,
              "value": "api",
              "heading": "api"
            }
          ],
          "title": "useToggle",
          "hasPreviewer": true,
          "nav": {
            "path": "/use-toggle",
            "title": "UseToggle"
          }
        },
        "title": "useToggle - Muggle React Hooks"
      }
    ],
    "title": "Muggle React Hooks",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
