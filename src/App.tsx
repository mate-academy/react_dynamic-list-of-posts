import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { GlobalProvider } from './components/GeneralContext';
import { MainContent } from './components/MainContent';

export const App: React.FC = () => (
  <GlobalProvider>
    <main className="section">
      <div className="container">
        <MainContent />
      </div>
    </main>
  </GlobalProvider>
);
