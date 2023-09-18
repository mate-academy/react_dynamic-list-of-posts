import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { useSelectedUser } from './components/Contexts/UserContext';
import { useError } from './components/Contexts/ErrorContext';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { selectedUser } = useSelectedUser();
  const { error } = useError();

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
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!!selectedUser && (
                  <PostsList
                    selectedPost={selectedPost}
                    onSelectPost={(post) => setSelectedPost(post)}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
