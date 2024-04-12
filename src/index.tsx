import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from './context/Context';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider>
    <App />
  </Provider>,
);
