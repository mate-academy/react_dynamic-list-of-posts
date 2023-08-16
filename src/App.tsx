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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const getUsersFunc = async () => {
    try {
      setUsers(await getUsers());
    } catch (error) {
      setIsError(true);
    }
  };

  const getPostsfunc = async (user: User) => {
    try {
      setPosts(await getPosts(user.id));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersFunc();
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (selectedUser) {
      setIsLoading(true);
      getPostsfunc(selectedUser);
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
                  // eslint-disable-next-line no-extra-boolean-cast
                  !!!selectedUser
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                }

                {
                  isLoading
                    ? <Loader />
                    : (
                      <>
                        {isError && (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        )}
                        {/* eslint-disable-next-line no-extra-boolean-cast */}
                        {!!!posts.length && selectedUser && !isError && (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}

                        {!!posts.length && selectedUser && !isError && (
                          <PostsList
                            posts={posts}
                            selectedPost={selectedPost}
                            selectPost={setSelectedPost}
                          />
                        )}
                      </>
                    )
                }

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
