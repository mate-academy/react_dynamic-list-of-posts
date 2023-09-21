import ReactDOM from 'react-dom';

import { App } from './App';
import { ModalUserProvider } from './components/ModalUserContext';

ReactDOM.render(
  <ModalUserProvider>
    <App />
  </ModalUserProvider>,
  document.getElementById('root'),
);
