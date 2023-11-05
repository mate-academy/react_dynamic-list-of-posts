import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { User } from './types/User';
import { getUsers } from './utils/getUsers';
import { getPosts } from './utils/getPosts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const hasNoPosts = !loading && !hasError && !posts.length && selectedUser;

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers(res);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);

      getPosts(selectedUser.id)
        .then(res => {
          setPosts(res);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

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
                  selectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && (
                  <Loader />
                )}

                {!loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!loading && !!posts.length && (
                  <PostsList
                    posts={posts}
                    currentPost={currentPost}
                    selectPost={setCurrentPost}
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
                'Sidebar--open': currentPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && (
                <PostDetails
                  currentPost={currentPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
