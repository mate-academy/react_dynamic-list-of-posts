import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);
  const [isError, setIsEroor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedUser) {
        try {
          setIsLoading(true);
          const response = await client.get<Post[]>(`/posts?userId=${selectedUser.id}`);

          setUserPosts(response);
        } catch {
          setIsEroor(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (selectedUser) {
      fetchData();
    }
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await client.get<User[]>('/users');

      setUsers(response);
    } catch {
      setIsEroor(true);
    }
  };

  fetchUsers();

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setSelectedPost={setSelectedPost}
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              {!selectedUser && (
                <p data-cy="NoSelectedUser">
                  No user selected
                </p>
              )}

              {isLoading
                ? <Loader />
                : (
                  <div className="block" data-cy="MainContent">
                    {isError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {selectedUser && userPosts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!!userPosts.length && (
                      <PostsList
                        userPosts={userPosts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    )}
                  </div>
                )}

            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
