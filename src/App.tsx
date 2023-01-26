import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Sidebar } from './components/Sidebar';

export const App: React.FC = () => {
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
                <p data-cy="NoSelectedUser">No user selected</p>

                <Loader />

                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div>

                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>

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
