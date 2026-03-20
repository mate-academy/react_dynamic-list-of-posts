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
import * as httpService from './api/HttpClient';
import { Post } from './types/Post';
import { Status } from './types/Status';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [usersPosts, setUsersPost] = useState<Post[]>([]);

  const [usersStatus, setUsersStatus] = useState<Status>(Status.IDLE);
  const [usersPostStatus, setUsersPostStatus] = useState<Status>(Status.IDLE);

  const [dropdownActive, setDropdownActive] = useState(false);

  const activateSelector = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (event.currentTarget.className === 'dropdown') {
      setDropdownActive(true);
    } else {
      setDropdownActive(false);
    }
  };

  const loadUsers = async () => {
    try {
      const userData: User[] = await httpService.getUsers();

      setUsers(userData);
    } catch {
      setUsersStatus(Status.Error);
    }
  };

  const loadUsersPosts = async (userId: number) => {
    setUsersPostStatus(Status.Loading);
    setSelectedPost(null);
    try {
      const posts = await httpService.getUsersPosts(userId);

      setUsersPost(posts);
      setUsersPostStatus(Status.Success);
    } catch (error) {
      setUsersPostStatus(Status.Error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadUsersPosts(selectedUser.id);
    }
  }, [selectedUser]);

  return (
    <main className="section" onClick={activateSelector}>
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  dropdownActive={dropdownActive}
                  setSelectedUser={setSelectedUser}
                  activateSelector={activateSelector}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {usersPostStatus === Status.Loading && <Loader />}

                {(usersPostStatus === Status.Error ||
                  usersStatus === Status.Error) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {usersPostStatus === Status.Success && (
                  <>
                    {usersPosts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {usersPosts.length > 0 && (
                      <PostsList
                        usersPosts={usersPosts}
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
            {selectedPost && (
              <div className="tile is-child box is-success">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
