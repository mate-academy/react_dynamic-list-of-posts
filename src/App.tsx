import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getPosts } from './api/posts';

import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [usersPosts, setUsersPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    setIsError(false);

    if (selectedUser) {
      setIsLoading(true);

      getPosts(selectedUser)
        .then(setUsersPosts)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
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
                  selectedUser={selectedUser}
                  onChoose={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoading && (
                  <Loader />
                )}

                {!isLoading && !selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {!isLoading && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoading && usersPosts && (!usersPosts.length ? (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={usersPosts}
                    onChoose={setSelectedPost}
                    selectedPost={selectedPost}
                  />
                ))}
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
              {selectedPost && (<PostDetails post={selectedPost} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
