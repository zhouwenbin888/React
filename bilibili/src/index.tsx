import ReactDOM from 'react-dom/client'
import App from './App'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);//把根组件渲染到id为root的dom节点上

root.render(
  <App />
);
