import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getPosts, getUsers } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      setPost(null);

      getPosts(user.id)
        .then(setPosts)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} user={user} setUser={setUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}

                {isLoading && <Loader />}

                {errorMessage && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!!posts.length && !isLoading && (
                  <PostsList posts={posts} post={post} setPost={setPost} />
                )}

                {user && !posts.length && !isLoading && !errorMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
              { 'Sidebar--open': post },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails
                  post={post}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setErrorMessage={setErrorMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
