import { useState, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasUsersError, setHasUsersError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [postsState, setPostsState] = useState({
    items: [] as Post[],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    setHasUsersError(false);
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setHasUsersError(true));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPostsState({ items: [], isLoading: false, hasError: false });
      setSelectedPost(null);

      return;
    }

    setSelectedPost(null);
    setPostsState({ items: [], isLoading: true, hasError: false });

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(items => {
        setPostsState({ items, isLoading: false, hasError: false });
      })
      .catch(() => {
        setPostsState({ items: [], isLoading: false, hasError: true });
      });
  }, [selectedUser]);

  const showNoPostsMessage =
    Boolean(selectedUser) &&
    !postsState.isLoading &&
    !postsState.hasError &&
    postsState.items.length === 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUser?.id || 0}
                  onSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {hasUsersError && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    Unable to load users
                  </div>
                )}

                {!selectedUser && !hasUsersError && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsState.isLoading && <Loader />}

                {postsState.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {postsState.items.length > 0 && !postsState.isLoading && (
                  <PostsList
                    posts={postsState.items}
                    selectedPostId={selectedPost?.id || 0}
                    onSelectPost={setSelectedPost}
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
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
