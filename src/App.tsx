import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import { getAllUsers } from './api/fetchUsers';
import { Post } from './types/Post';
import { getUserPosts } from './api/fetchPosts';

export const App = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const [userPosts, setUserPosts] = useState<null | Post[]>(null);
  const [selectedPosts, setSelectedPosts] = useState<null | Post>(null);

  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const loadedUsers: User[] = await getAllUsers();

        setAllUsers(loadedUsers);
      } catch {
        setError('Failed to get a list of users');
      }
    }

    fetchUsers();
  }, []); //Get all users

  async function selectUser(user: User) {
    setSelectedUser(user);
    setSelectedPosts(null);

    setLoadingData(true);
    try {
      const loadedUserPosts = await getUserPosts(user.id);

      setUserPosts(loadedUserPosts);
    } catch {
      setError('Failed to get a list of user posts');
    } finally {
      setLoadingData(false);
    }
  } //Get user posts

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  allUsers={allUsers}
                  activeUser={selectedUser}
                  onChangeActiveUser={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingData && <Loader />}

                {!loadingData && (
                  <>
                    {error && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {error}
                      </div>
                    )}

                    {userPosts?.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {userPosts && userPosts.length > 0 && (
                      <PostsList
                        posts={userPosts}
                        selectedPost={selectedPosts}
                        onChangeSelectedPost={setSelectedPosts}
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
              { 'Sidebar--open': selectedPosts },
            )}
          >
            {selectedPosts && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPosts} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
