import React, { useContext } from 'react';
import cn from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { UsersContext } from './store/UsersContext';
import { PostsContext } from './store/PostsContext';

export const App: React.FC = () => {
  const { selectedUser } = useContext(UsersContext);
  const { posts, loading, errorMessage, selectedPost } =
    useContext(PostsContext);

  const show = {
    postsError: !loading && errorMessage,
    posts: !loading && !errorMessage && posts.length,
    noPosts: !loading && !errorMessage && !posts.length && selectedUser,
    noUserSelected: !loading && !errorMessage && !posts.length && !selectedUser,
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block" data-cy="MainContent">
                <div className="block">
                  <UserSelector />
                </div>

                {loading && <Loader />}

                {show.postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {show.posts && <PostsList />}

                {show.noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {show.noUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
