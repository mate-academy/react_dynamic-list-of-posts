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
import { getPosts, getUser } from './api/api';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser()
      .then(setUsers)
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (activeUser) {
      setIsLoading(true);
      getPosts({ id: activeUser.id })
        .then(setPosts)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [activeUser]);

  const isPostsList =
    activeUser && !isError && posts.length > 0 ? posts : false;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  activeUser={activeUser}
                  setActiveUser={user => {
                    setActiveUser(user);
                    setActivePost(null);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && !isError && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                <Loader isLoading={isLoading} />
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoading && !posts.length && !isError && activeUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {!isLoading && posts.length > 0 && (
                  <PostsList
                    isPostsList={isPostsList}
                    posts={posts}
                    setActivePost={setActivePost}
                    activePost={activePost}
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
              { 'Sidebar--open': activePost !== null },
            )}
          >
            {activePost && (
              <div className="tile is-child box is-success ">
                <PostDetails activePost={activePost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
