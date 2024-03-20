import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { AppList } from './components/AppList';

export const App: React.FC = () => {
  return <AppList />;
};
