import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import React from 'react';
import './App.scss';
import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { useAppContext } from './context/AppContext';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const { selectedUser, selectedPost } = useAppContext();

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
                {
                  selectedUser
                    ? <PostsList />
                    : (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    )
                }
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
