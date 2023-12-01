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
import { Post } from './types/Post';
import * as service from './utils/api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropDownList, setIsDropDownList] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isForm, setIsForm] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    service.getUsers()
      .then(use => setUsers(use));
  }, []);

  const handleListDropDown = () => {
    setIsDropDownList(!isDropDownList);
  };

  const handleChoseUser = (user: User) => {
    setSelectedUser(user);
    setIsLoading(true);
    setIsDropDownList(false);
    setSelectedPost(null);

    service.getPosts(user.id)
      .then(pos => setPosts(pos))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  handleListDropDown={handleListDropDown}
                  selectedUser={selectedUser}
                  isDropDownList={isDropDownList}
                  setIsDropDownList={setIsDropDownList}
                  users={users}
                  handleChoseUser={handleChoseUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && !isLoading && posts.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {selectedUser && posts.length > 0 && !isError && (
                  <PostsList
                    posts={posts}
                    setIsForm={setIsForm}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              'Sidebar', {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isForm={isForm}
                  setIsForm={setIsForm}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};
