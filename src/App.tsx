import { FC, useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { PostsContext } from './components/PostsContext';
import { CommentsProvider } from './components/CommentsContext';

export const App: FC = () => {
  const { currently, post } = useContext(PostsContext);

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
                { currently === 'noUser' && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { currently === 'loading' && (
                  <Loader />
                )}

                { currently === 'serverError' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                { currently === 'noPosts' && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {currently === 'active' && (
                  <PostsList />
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
              { 'Sidebar--open': !!post },
            )}
          >
            {currently === 'active' && post && (
              <div className="tile is-child box is-success ">
                <CommentsProvider>
                  <PostDetails />
                </CommentsProvider>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
