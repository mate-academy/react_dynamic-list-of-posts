import React, { useState, useEffect } from 'react';
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
import { getUsers } from './api/users';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const GetUsersFunction = async () => {
    try {
      setUsers(await getUsers());
    } catch (error) {
      setIsError(true);
    }
  };

  const GetPostsFunction = async (user: User) => {
    try {
      setPosts(await getPosts(user.id));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetUsersFunction();
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (selectedUser) {
      setIsLoading(true);
      GetPostsFunction(selectedUser);
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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { isLoading ? (
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

                    {!posts.length && selectedUser && !isError && (
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
                        setSelectedPost={setSelectedPost}
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
                'Sidebar--open': selectedPost,
              },
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
