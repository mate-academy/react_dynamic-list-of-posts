// #region imports
import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect, useState } from 'react';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { UserPosts } from './components/UserPosts';
import { getUsers } from './services/users';
import { Post } from './types/Post';
import { User } from './types/User';
// #endregion

export const App = () => {
  // #region states
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // #endregion

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor columns">
          <div className="tile is-parent column">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedId={selectedUserId}
                  onSelectId={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUserId && (
                  <UserPosts
                    userId={selectedUserId}
                    selectedPostId={selectedPost?.id || null}
                    onPostSelect={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'column',
              'is-half-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
