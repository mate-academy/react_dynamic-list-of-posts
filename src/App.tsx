import { FC } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector/UserSelector';
import { MainContent } from './components/MainContent';
import { Sidebar } from './components/Sidebar';
import { CommentsProvider } from './components/CommentsProvider';
import { PostsProvider } from './components/PostsProvider';

export const App: FC = () => {
  return (
    <main className="section">
      <div className="container">
        <PostsProvider>
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector />
                </div>

                <MainContent />
              </div>
            </div>

            <CommentsProvider>
              <Sidebar />
            </CommentsProvider>
          </div>
        </PostsProvider>
      </div>
    </main>
  );
};
