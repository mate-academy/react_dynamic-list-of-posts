/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getAllUsers, getPostsfromUser } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [currentPostsList, setCurrentPostsList] = useState<Post[]>([]);
  const [postError, setPostError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectedPost = currentPostsList.find((post) => (
    post.id === selectedPostId
  ));

  useEffect(() => {
    getAllUsers()
      .then((data) => (
        setVisibleUsers(data)
      ))
      .catch(() => (
        alert('Coult not load the Users')
      ));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPostsfromUser(selectedUserId)
      .then((data) => (
        setCurrentPostsList(data)
      ))
      .catch(() => (
        setPostError(true)
      ))
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  visibleUsers={visibleUsers}
                  setSelectedUserId={setSelectedUserId}
                  setPostError={setPostError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedUserId && isLoading && (
                  <Loader />
                )}
                {selectedUserId && !isLoading && postError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUserId
                  && !isLoading && currentPostsList.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}
                {selectedUserId
                  && !isLoading && currentPostsList.length > 0 && (
                  <PostsList
                    currentPostsList={currentPostsList}
                    setSelectedPost={setSelectedPostId}
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
              { 'Sidebar--open': selectedPostId },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  selectedUserId={selectedUserId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
