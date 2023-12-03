import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TodosProvider } from './TodoContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <TodosProvider>
      <App />
    </TodosProvider>,
  );
