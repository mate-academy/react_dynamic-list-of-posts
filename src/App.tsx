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
import { getPosts, getUsers } from './api/api';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (activeUser) {
      setLoading(true);

      getPosts(activeUser)
        .then(setPosts)
        .catch(() => setIsError(true))
        .finally(() => setLoading(false));
    }
  }, [activeUser]);

  const isSideBar =
    activePost && showSideBar && activeUser?.id === activePost.userId;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onActiveUser={setActiveUser}
                  activeUser={activeUser}
                  onShowSideBar={setShowSideBar}
                  onActivePost={setActivePost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {isError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!isError && !activeUser && (
                      <p data-cy="NoSelectedUser">No user selected</p>
                    )}

                    {!isError && activeUser && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!isError && activeUser && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        onActivePost={setActivePost}
                        onShowSideBar={setShowSideBar}
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
              {
                'Sidebar--open': isSideBar,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost && (
                <PostDetails post={activePost} key={activePost.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
