import ReactDOM from 'react-dom';
import { UsersProvider } from './components/UsersContext';

import { App } from './App';

ReactDOM.render(
  <UsersProvider>
    <App />
  </UsersProvider>,
  document.getElementById('root'),
);
