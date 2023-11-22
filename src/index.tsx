import ReactDOM from 'react-dom';

import { App } from './App';
import { ContextProvider } from './components/Context/Context';

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root'),
);
