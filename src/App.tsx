import React, { useCallback, useContext, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { GlobalContext } from './State';
import { getPostByUserId } from './components/api/getData';

export const App: React.FC = () => {
  const {
    isloadingPosts,
    errorMessage,
    selectedUser,
    posts,
    setIsloadingPosts,
    setPosts,
    setErrorMessage,
    selectedPost,
  } = useContext(GlobalContext);

  const shouldShowNoPosts =
    posts.length === 0 && selectedUser && !isloadingPosts && !errorMessage;

  const shouldShowPosts =
    posts.length > 0 && selectedUser && !isloadingPosts && !errorMessage;

  const fetchPosts = useCallback(async () => {
    if (!selectedUser) {
      return;
    }

    try {
      setIsloadingPosts(true);
      setErrorMessage(false);
      const postsData = await getPostByUserId(selectedUser.id);

      setPosts(postsData);
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsloadingPosts(false);
    }
  }, [selectedUser]);

  useEffect(() => {
    fetchPosts();
  }, [selectedUser, fetchPosts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isloadingPosts && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPosts && <PostsList />}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                {!isloadingPosts && selectedPost && <PostDetails />}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
