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

import { getPosts } from './api/ApiMethods';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      setHasError(false);

      getPosts(selectedUser.id)
        .then(posts => setUserPosts(posts))
        .catch(() => setHasError(true))
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
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setOpenPost={setOpenPost}
                />
              </div>

              {loading ? (
                <Loader />
              ) : (
                <div className="block" data-cy="MainContent">
                  {!selectedUser && (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  )}

                  {hasError && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                  {userPosts.length === 0 && selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                  {userPosts.length !== 0 && (
                    <PostsList
                      userPosts={userPosts}
                      setOpenPost={setOpenPost}
                      openPost={openPost}
                      setIsFormOpen={setIsFormOpen}
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
              { 'Sidebar--open': openPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                openPost={openPost}
                setIsFormOpen={setIsFormOpen}
                isFormOpen={isFormOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
