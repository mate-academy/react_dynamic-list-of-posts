import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { App } from './App';
import { AppProvider } from './components/Context/AppContext';

ReactDOM.render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>,
  document.getElementById('root'),
);
