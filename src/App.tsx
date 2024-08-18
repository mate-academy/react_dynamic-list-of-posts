import React, { useEffect, useRef, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import * as postServiseUsers from './api/users';
import * as postServisePosts from './api/posts';
import { Post } from './types/Post';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorUsers, setErrorUsers] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [errorPosts, setErrorPosts] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [activePostId, setActivePostId] = useState<number | null>(null);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      setActivePostId(null);
      setLoadingPosts(true);
      if (activeUserId) {
        postServisePosts
          .getPosts(activeUserId)
          .then(setPosts)
          .catch(() => {
            setErrorPosts(true);
          })
          .finally(() => setLoadingPosts(false));
      }
    }
  }, [activeUserId]);

  useEffect(() => {
    postServiseUsers
      .getUsers()
      .then(setUsers)
      .catch(() => setErrorUsers(true));

    firstRender.current = false;
  }, []);

  return (
    <main className="section">
      <div className="container">
        {!errorUsers ? (
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector users={users} activeUser={setActiveUserId} />
                </div>

                <div className="block" data-cy="MainContent">
                  {!activeUserId && (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  )}

                  {activeUserId && !errorPosts ? (
                    <>
                      {loadingPosts ? (
                        <Loader />
                      ) : (
                        <>
                          {posts.length === 0 ? (
                            <div
                              className="notification is-warning"
                              data-cy="NoPostsYet"
                            >
                              No posts yet
                            </div>
                          ) : (
                            <PostsList
                              posts={posts}
                              setActivePostId={setActivePostId}
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <ErrorNotification errorPosts={errorPosts} />
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
                { 'Sidebar--open': activePostId },
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails posts={posts} activePostId={activePostId} />
              </div>
            </div>
          </div>
        ) : (
          <ErrorNotification errorUsers={errorUsers} />
        )}
      </div>
    </main>
  );
};
