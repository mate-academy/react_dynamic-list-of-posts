import React from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { NotificationProvider } from './Context/NotificationManager';
import { CurrentPostProvider } from './Context/CurrentPostContext';
import { CurrentUserProvider } from './Context/CurrentUserContext';
import { AppContent } from './components/AppContent/AppContent';
import { SidebarProvider } from './Context/SidebarContext';
import { UserPostsProvider } from './Context/UserPostsContext';
import { CommentsProvider } from './Context/CommentsContext';
import { UserListProvider } from './Context/UserListContext';

export const App: React.FC = () => {
  return (
    <main className="section">
      <div className="container">
        <UserListProvider>
          <NotificationProvider>
            <SidebarProvider>
              <CurrentUserProvider>
                <CurrentPostProvider>
                  <UserPostsProvider>
                    <CommentsProvider>
                      <AppContent />
                    </CommentsProvider>
                  </UserPostsProvider>
                </CurrentPostProvider>
              </CurrentUserProvider>
            </SidebarProvider>
          </NotificationProvider>
        </UserListProvider>
      </div>
    </main>
  );
};
