import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | undefined>();
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [posts, setPosts] = useState<Post[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post>();

  useEffect(() => {
    getUsers()
      .then(result => {
        setUsers(result);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getPosts(selectedUser.id)
        .then(result => {
          setPosts(result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {users && (
                  <UserSelector
                    users={users}
                    selectedUser={user => setSelectedUser(user)}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {!posts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && (
                  <PostsList
                    openedPost={openedPost}
                    posts={posts}
                    onOpenPost={post => setOpenedPost(post)}
                  />
                )}
              </div>
            </div>
          </div>

          {openedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': openedPost },
              )}
            >
              {openedPost && (
                <div className="tile is-child box is-success ">
                  <PostDetails post={openedPost} selectedUser={selectedUser} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
