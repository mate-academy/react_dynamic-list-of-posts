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
import { Post } from './types/Post';
import { getPosts, getUsers } from './api';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer))
      .catch(() => setError('Unable get users, reload the page.'));
  }, []);

  useEffect(() => {
    if (currentUser) {
      setError('');
      setIsLoading(true);
      getPosts(currentUser.id)
        .then(postsFromServer => setPosts(postsFromServer))
        .catch(() => setError('Unable get posts.'))
        .finally(() => setIsLoading(false));
    }
  }, [currentUser]);

  const handlerSetCurentUser = (user: User | null) => {
    setCurrentUser(user);
    setCurrentPost(null);
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
                  currentUser={currentUser}
                  setCurrentUser={handlerSetCurentUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {error && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {!posts.length && currentUser && !isLoading && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && !isLoading && (
                  <PostsList
                    posts={posts}
                    currentPostId={currentPost?.id}
                    setCurrentPost={setCurrentPost}
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
              { 'Sidebar--open': !!currentPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails post={currentPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
