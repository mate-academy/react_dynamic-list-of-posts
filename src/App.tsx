import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  useEffect(() => {
    setOpenedPost(null);
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? (
                  <PostsList
                    userID={selectedUser.id}
                    setOpenedPost={setOpenedPost}
                    openedPost={openedPost}
                  />
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
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
              { 'Sidebar--open': !!openedPost },
            )}
          >
            {!!openedPost && (
              <div className="tile is-child box is-success">
                <PostDetails post={openedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
