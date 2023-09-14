import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { UserSelector } from './components/UserSelector';
import {
  ErrorContext,
  PostDataContext,
  PostsContext,
  UserContext,
} from './components/UserContext/UserContext';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const { isError, isLoadingPosts } = useContext(ErrorContext);
  const { user } = useContext(UserContext);
  const posts = useContext(PostsContext);
  const postDetails = useContext(PostDataContext);

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
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isLoadingPosts ? <Loader /> : (
                  <>
                    {(posts?.length > 0 && user && !isError) && (
                      <PostsList />
                    )}

                    {(posts?.length === 0 && user && !isError) && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {postDetails.postData !== null && (
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
                <PostDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
