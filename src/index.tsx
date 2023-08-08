import ReactDOM from 'react-dom';

import { App } from './App';
import { UsersProvider } from './context/UsersContext';

ReactDOM.render(
  <UsersProvider>
    <App />
  </UsersProvider>,
  document.getElementById('root'),
);
