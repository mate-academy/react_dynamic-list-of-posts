import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { useEffect, useState } from 'react';
import { getPostsByUser, getUsers } from './utils/fetchClient';
import { User } from './types/User';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loadPostsError, setLoadPostsError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  useEffect(() => {
    getUsers()
      .then(result => {
        setUsers(result);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load users:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      setPosts([]);

      return;
    }

    setLoadPostsError(null);
    setIsLoading(true);
    getPostsByUser(selectedUserId)
      .then(result => {
        setPosts(result);
      })
      .catch(() => setLoadPostsError('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                  users={users}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {loadPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {loadPostsError}
                  </div>
                )}

                {selectedUserId && posts.length === 0 && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUserId && posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    openPostId={openPostId}
                    setOpenPostId={setOpenPostId}
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
              {
                'Sidebar--open': openPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails posts={posts} openPostId={openPostId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
