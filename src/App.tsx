import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUsers } from './api/users';
import { getUserPosts } from './api/postService';
import { User } from './types/User';
import { Post } from './types/Post';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [hasUsersError, setHasUsersError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getUsers()
      .then(loadedUsers => {
        if (!cancelled) {
          setUsers(loadedUsers);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasUsersError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    let cancelled = false;

    getUserPosts(selectedUser.id)
      .then(loadedPosts => {
        if (!cancelled) {
          setPosts(loadedPosts);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasPostsError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    if (user.id === selectedUser?.id) {
      return;
    }

    setSelectedUser(user);
    setSelectedPost(null);
    setPosts([]);
    setHasPostsError(false);
    setIsLoading(true);
  };

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
                  onUserSelect={handleUserSelect}
                />

                {hasUsersError && (
                  <p className="notification is-danger">Unable to load users</p>
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isLoading && <Loader />}

                {selectedUser && !isLoading && hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !isLoading &&
                  !hasPostsError &&
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
                      onPostSelect={setSelectedPost}
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
              {
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails key={selectedPost.id} post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
