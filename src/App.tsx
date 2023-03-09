import { FunctionComponent } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Main } from './components/Main';

export const App: FunctionComponent = () => {
  return (
    <main className="section">
      <Main />
    </main>
  );
};
