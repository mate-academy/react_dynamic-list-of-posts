import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { AppProvider } from './components/AppContext';
import { AppSection } from './components/AppSection';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppSection />
    </AppProvider>
  );
};
