/* eslint-disable react-hooks/exhaustive-deps */
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
import { getUserPosts } from './api/ClientFunctions';
import { Post } from './types/Post';

export const App = () => {
  // #region states

  const [currUser, setCurrUser] = useState<User | null>(null);
  const [isDdActive, setIsDdActive] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loadingPostsError, setLoadingPostsError] = useState(false);
  const [arePostsLoading, setArePostsLoading] = useState(false);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [prevUser, setPrevUser] = useState<User | null>(null);
  const [doesFormExist, setDoesFormExist] = useState(false);

  // #endregion
  // #region handlers

  const sectionOnClickHandler = () => {
    if (isDdActive) {
      setIsDdActive(false);
    }
  };

  // #endregion
  // #region useEffects

  useEffect(() => {
    if (currUser) {
      const { id } = currUser;

      setArePostsLoading(true);

      getUserPosts(id)
        .then(posts => {
          setUserPosts(posts);

          if (loadingPostsError) {
            setLoadingPostsError(false);
          }
        })
        .catch(() => setLoadingPostsError(true))
        .finally(() => setArePostsLoading(false));
    }
  }, [currUser]);

  useEffect(() => {
    if (userPosts.length === 0 && currUser) {
      setIsNoPosts(true);
    } else if (userPosts.length > 0 && isNoPosts) {
      setIsNoPosts(false);
    }
  }, [currUser, isNoPosts, userPosts]);

  useEffect(() => {
    if (prevUser?.id !== currUser?.id) {
      setOpenedPost(null);
    }
  }, [prevUser, currUser]);

  useEffect(() => {
    if (doesFormExist) {
      setDoesFormExist(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedPost]);

  // #endregion
  // #region markups

  const loadingPostsErrorMarkup = (
    <div className="notification is-danger" data-cy="PostsLoadingError">
      Something went wrong!
    </div>
  );
  const noPostsMarkup = (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );
  const postsList = (
    <PostsList
      userPosts={userPosts}
      openedPost={openedPost}
      setOpenedPost={setOpenedPost}
    />
  );

  // #endregion

  return (
    <main className="section" onClick={sectionOnClickHandler}>
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  isDdActive={isDdActive}
                  currUser={currUser}
                  setPrevUser={setPrevUser}
                  setCurrUser={setCurrUser}
                  setIsDdActive={setIsDdActive}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currUser && <p data-cy="NoSelectedUser">No user selected</p>}

                {arePostsLoading ? (
                  <Loader />
                ) : (
                  (loadingPostsError && loadingPostsErrorMarkup) ||
                  (isNoPosts && noPostsMarkup) ||
                  (userPosts.length > 0 && postsList)
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
              { 'Sidebar--open': openedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {openedPost && (
                <PostDetails
                  openedPost={openedPost}
                  doesFormExist={doesFormExist}
                  setDoesFormExist={setDoesFormExist}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
