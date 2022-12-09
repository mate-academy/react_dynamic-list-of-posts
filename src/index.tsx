import ReactDOM from 'react-dom';

import { App } from './App';
import { UserProvider } from './components/UserContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root'),
);
