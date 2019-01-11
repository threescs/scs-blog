/**
 * router index
 */
// 一个动态路由的高阶组件(根据路由进行代码拆分)
import React from 'react';
import Loadable from 'react-loadable';

const config = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../containers/root/Root.js'),
      loading: () => <div />,
    }),
  },
  {
    name: 'room',
    path: '/room',
    exact: true,
    component: Loadable({
      loader: () => import('../containers/room/Room.js'),
      loading: () => <div />,
    }),
  },
  {
    name: 'articles',
    path: '/articles',
    exact: true,
    component: Loadable({
      loader: () => import('../containers/articles/Articles.js'),
      loading: () => <div />,
    }),
  },
];

export default config;
