import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const selectUser = useCallback(user => {
    setLoader(true);
    setSelectedPost(null);
    setSelectedUser(user);
  }, []);

  useEffect(() => {
    client.get<User[]>('/users').then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(data => {
        setError(false);
        setPosts(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, [selectedUser?.id]);

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
                  selectUser={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? (
                  <>
                    {loader ? <Loader /> : (
                      <>
                        {error ? (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        ) : (
                          <>
                            {posts?.length ? (
                              <PostsList
                                posts={posts}
                                selectedPost={selectedPost}
                                selectPost={setSelectedPost}
                              />
                            ) : (
                              <div
                                className="notification is-warning"
                                data-cy="NoPostsYet"
                              >
                                No posts yet
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
