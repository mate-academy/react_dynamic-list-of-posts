import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { UserProvider } from './components/UsersContext';
import { PostProvider } from './components/PostContext';
import { CommentProvider } from './components/CommentContext';
import { FormProvider } from './components/FormContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <PostProvider>
      <CommentProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </CommentProvider>
    </PostProvider>
  </UserProvider>,
);
