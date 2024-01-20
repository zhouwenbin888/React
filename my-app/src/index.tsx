//项目的入口

import React from 'react';
import ReactDOM from 'react-dom/client';//两个核心包

import App from './App';//导入项目的根组件


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);//把根组件渲染到id为root的dom节点上

root.render(
  <App />
);
