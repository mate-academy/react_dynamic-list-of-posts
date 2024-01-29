import { createRoot } from 'react-dom/client';
import { App } from './App';
import { MainProvider } from './components/MainContext/MainContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <MainProvider>
      <App />
    </MainProvider>,
  );
