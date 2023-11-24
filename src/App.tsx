import React, {
  useContext,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { UserContext } from './components/Context/UserContext';
import { PostContext } from './components/Context/PostContext';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const {
    selectedUser,
  } = useContext(UserContext);

  const {
    posts,
    hasPostsError,
    isLoadingPosts,
    selectedPost,
  } = useContext(PostContext);

  const noPostsMsg
   = selectedUser && !isLoadingPosts && !hasPostsError && !posts.length;

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

                {!selectedUser
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                {isLoadingPosts && <Loader />}

                {hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!!posts.length
                   && <PostsList />}

                {noPostsMsg && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
