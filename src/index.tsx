import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from './components/Store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider>
    <App />
  </Provider>,
);
