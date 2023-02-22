import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const selectUser = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, [selectedUserId]);

  const selectPost = useCallback((post: Post | null) => {
    setSelectedPost(post);
  }, [selectedPost]);

  useEffect(() => {
    setSelectedPost(null);
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onSelectUser={selectUser}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === 0
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  ) : (
                    <PostsList
                      selectedUserId={selectedUserId}
                      onSelectPost={selectPost}
                      selectedPost={selectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
