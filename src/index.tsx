import ReactDOM from 'react-dom/client';
import App from './pages/app.component';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
import 'antd/dist/antd.less';
root.render(<App />);