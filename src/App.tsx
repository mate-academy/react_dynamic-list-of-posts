/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usersError, setUsersError] = useState(false);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setUsersError(true));
  }, []);

  useEffect(() => {
    setSelectedPostId(null);

    if (selectedUserId) {
      setIsLoading(true);
      setPostsError(false);

      client
        .get<Post[]>(`/posts?userId=${selectedUserId}`)
        .then(setPosts)
        .catch(() => setPostsError(true))
        .finally(() => setIsLoading(false));
    } else {
      setPosts([]);
    }
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {usersError ? (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    Failed to load users
                  </div>
                ) : (
                  <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    onSelectUser={setSelectedUserId}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoading &&
                  !postsError &&
                  selectedUserId &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!isLoading && !postsError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelectPost={setSelectedPostId}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId !== null && (
                <PostDetails
                  post={posts.find(post => post.id === selectedPostId)!}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
