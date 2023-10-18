import ReactDOM from 'react-dom';

import { App } from './App';
import { ModalUserProvider } from './components/ModalUserContext';
import { ModalPostProvider } from './components/ModalPostContext';

ReactDOM.render(
  <ModalPostProvider>
    <ModalUserProvider>
      <App />
    </ModalUserProvider>
  </ModalPostProvider>,
  document.getElementById('root'),
);
