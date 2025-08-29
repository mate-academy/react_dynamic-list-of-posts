/* eslint-disable @typescript-eslint/indent */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getPosts } from './api/apiPostsFromServer';
import { getUsers } from './api/users';
import { Post } from './types/Post';
import classNames from 'classnames';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedPost = posts.find(post => post.id === selectedPostId);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Unable to load users'));
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      setIsLoading(true);

      getPosts(selectedUserId)
        .then(setPosts)
        .catch(() => setError('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            {error && (
              <div
                className="notification is-danger"
                data-cy="ErrorNotification"
              >
                {error}
              </div>
            )}

            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userSelector={selectedUserId}
                  onUserSelect={setSelectedUserId}
                  setSelectedPostId={setSelectedPostId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {!isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {!isLoading &&
                  !error &&
                  posts.length === 0 &&
                  selectedUserId !== null && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!isLoading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    setSelectedPostId={setSelectedPostId}
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
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            {selectedPostId && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPostId={selectedPostId}
                  selectedPost={selectedPost}
                  error={error}
                  setError={setError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
