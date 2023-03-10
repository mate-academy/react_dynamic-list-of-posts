import ReactDOM from 'react-dom';

import { App } from './App';
import StateProvider from './reducer';

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root'),
);
