import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { User } from './types/User';
import { Post } from './types/Post';

import { getUsers } from './api/user';
import { getUserPosts } from './api/post';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  const selectUser = useCallback(
    (user: User) => {
      if (user === selectedUser) {
        return;
      }

      setHasError(false);
      setSelectedPost(null);
      setSelectedUser(user);

      setIsLoading(true);

      getUserPosts(user.id)
        .then(setPosts)
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    },
    [selectedUser],
  );

  const selectPost = useCallback(
    (post: Post) => {
      setSelectedPost(post !== selectedPost ? post : null);
    },
    [selectedPost],
  );

  const isUserSelected = selectUser !== null;

  const showError = isUserSelected && hasError;
  const showLoader = isUserSelected && isLoading;

  const showContent = !showError && !showLoader;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelect={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {showLoader && <Loader />}
                {showError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showContent &&
                  (posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelect={selectPost}
                    />
                  ))}
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
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
