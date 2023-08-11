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
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSelect, setHasSelect] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (selectUser) {
      setLoading(true);
      setHasError(false);

      getPosts(selectUser.id)
        .then(posts => setUserPosts(posts))
        .catch(() => setHasError(true))
        .finally(() => {
          setLoading(false);
          setHasSelect(true);
        });
    }
  }, [selectUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setSelectUser={setSelectUser}
                  selectUser={selectUser}
                />
              </div>

              {loading ? (
                <Loader />
              ) : (
                <div className="block" data-cy="MainContent">
                  {!selectUser && (
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

                  {userPosts.length === 0 && hasSelect && (
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
                      setOpenForm={setOpenForm}
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
                setOpenForm={setOpenForm}
                openForm={openForm}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
