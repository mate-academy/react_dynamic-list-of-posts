import { createRoot } from 'react-dom/client';
import { App } from './App';
import { StateProvider } from './components/StateProvider';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StateProvider>
    <App />
  </StateProvider>,
);
