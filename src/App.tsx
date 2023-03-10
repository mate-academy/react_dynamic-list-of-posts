import React, { useContext, useEffect, useMemo } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { GlobalContext } from './reducer';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const closeDrobdownMenu = (event: any) => {
    if (event.target.parentNode) {
      if (
        event.target.parentNode.className !== 'button'
        && event.target.parentNode.className !== 'icon is-small'
        && event.target.parentNode.className !== 'dropdown-trigger'
      ) {
        dispatch({ type: 'active', show: false });
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDrobdownMenu);
  }, []);

  const noPost = useMemo(() => {
    return state.load.type === 'postsUser'
      && !state.load.active
      && state.listPostsUser.length < 1
      && state.error?.type !== 'listPosts';
  }, [state.load]);

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
                {!state.selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(state.load.type === 'postsUser' && state.load.active)
                  && <Loader />}

                {state.error?.type === 'listPosts' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(noPost) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                <PostsList />
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
              { 'Sidebar--open': state.selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {state.selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
