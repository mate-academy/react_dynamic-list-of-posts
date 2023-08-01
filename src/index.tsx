import ReactDOM from 'react-dom';

import { App } from './App';
import { GlobalStateProvider } from './reducer/store';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root'),
);
