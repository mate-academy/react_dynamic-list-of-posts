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
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(setUsers)
      .catch(() => setIsUserError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(setPosts)
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
                  selectUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {
                  !selectedUser
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                }

                {
                  loading
                    ? <Loader />
                    : (
                      <>
                        {
                          isUserError
                          && (
                            <div
                              className="notification is-danger"
                              data-cy="PostsLoadingError"
                            >
                              Something went wrong!
                            </div>
                          )
                        }
                      </>
                    )
                }

                {!loading && posts.length === 0 && selectedUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!loading && posts.length !== 0 && selectedUser && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    selectPost={setSelectedPost}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
