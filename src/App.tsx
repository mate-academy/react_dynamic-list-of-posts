import { useState } from 'react';
import classNames from 'classnames';
import { Post } from './types';
import { PostsTable } from './components/PostsTable/PostsTable';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <div className="block">
                <UserSelector
                  selectedUserId={selectedUserId}
                  onSelect={userId => {
                    setSelectedUserId(userId);
                    setSelectedPost(null);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <PostsTable
                    userId={selectedUserId}
                    selectedPostId={selectedPost?.id || null}
                    onPostSelect={post => {
                      if (post.id === 0) {
                        setSelectedPost(null);
                      } else {
                        setSelectedPost(post);
                      }
                    }}
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
            <div className="tile is-child box">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  onClose={() => setSelectedPost(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
