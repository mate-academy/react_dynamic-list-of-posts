import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { UserProvider } from './components/Context/Context';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
