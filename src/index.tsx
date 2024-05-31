import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
);
