import ReactDOM from 'react-dom';

import { App } from './App';
import { AppProvider } from './components/Context';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
);
