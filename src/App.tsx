/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { GlobalProvider } from './context/Context';
import { PostApp } from './components/PostApp';

export const App: React.FC = () => {
  return (
    <GlobalProvider>
      <PostApp />
    </GlobalProvider>
  );
};
