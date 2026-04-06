import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    client
      .get<User[]>('/users')
      .then(data => {
        setUsers(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (selectedUserId === null) {
      setPosts([]);
      setIsLoading(false);

      return;
    }

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(data => {
        setPosts(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [selectedUserId]);

  useEffect(() => {
    setSelectedPostId(null);
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onUserSelect={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUserId !== null && (
                  <>
                    {isLoading && <Loader />}

                    {error && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!isLoading && !error && posts.length === 0 && (
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
                        onPostSelect={setSelectedPostId}
                        selectedPostId={selectedPostId}
                      />
                    )}
                  </>
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
                  post={posts.find(p => p.id === selectedPostId) || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
