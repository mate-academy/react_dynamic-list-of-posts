import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  setOpenPostId={setOpenPostId}
                  setPosts={setPosts}
                  setIsLoading={setIsPostsLoading}
                  setErrorMessage={setErrorMessage}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {selectedUser ? '' : 'No user selected'}
                </p>

                <Loader isLoading={isPostsLoading} />

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser && !isPostsLoading && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                <PostsList
                  posts={posts}
                  openPostId={openPostId}
                  setOpenPostId={setOpenPostId}
                />
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
              {
                'Sidebar--open': openPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {openPostId && (
                <PostDetails
                  openPostId={openPostId}
                  posts={posts}
                  isLoading={isCommentsLoading}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  setIsLoading={setIsCommentsLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
