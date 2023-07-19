import { FC } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { ListProvider } from './context/ListContext';
import { ListApp } from './components/ListApp';

export const App: FC = () => (
  <ListProvider>
    <ListApp />
  </ListProvider>
);
