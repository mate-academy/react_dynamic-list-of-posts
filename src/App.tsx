import { FC } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/Posts/PostsList';
import { UserSelector } from './components/UserSelector';
import { Sidebar } from './components/Sidebar';

export const App: FC = () => {
  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                <PostsList />
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
