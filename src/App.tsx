import { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleUserSelect = (userId: number | null) => {
    setSelectedUserId(userId);
    setSelectedPost(null);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector onUserSelect={handleUserSelect} />
              </div>
              <div className="block" data-cy="MainContent">
                {selectedUserId === null ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <PostsList
                    userId={selectedUserId}
                    selectedPost={selectedPost}
                    onPostSelect={setSelectedPost}
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
              { 'Sidebar--open': selectedPost !== null }
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails post={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
