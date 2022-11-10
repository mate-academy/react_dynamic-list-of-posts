import ReactDOM from 'react-dom';

import { App } from './App';
import { UsersProvider } from './components/UsersProvider';

ReactDOM.render(
  <UsersProvider>
    <App />
  </UsersProvider>,
  document.getElementById('root'),
);
