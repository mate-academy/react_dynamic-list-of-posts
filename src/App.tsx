import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { ErrorNotification } from './types/ErrorNotification';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [errorNotification, setErrorNotification]
    = useState<ErrorNotification>({
      users: false,
      posts: false,
      comments: false,
      newComment: false,
      deleteComment: false,
    });

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userSelected={userSelected}
                  setUserSelected={setUserSelected}
                  setErrorNotification={setErrorNotification}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {errorNotification.users && (
                  <div className="notification is-danger">
                    There are no users on the server
                  </div>
                )}

                {errorNotification.posts && !userSelected && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 && userSelected && isPostsLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userSelected && (
                  <PostsList
                    setPosts={setPosts}
                    userSelected={userSelected}
                    setErrorNotification={setErrorNotification}
                    posts={posts}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                    isPostsLoading={isPostsLoading}
                    setIsPostsLoading={setIsPostsLoading}
                  />
                )}
              </div>
            </div>
          </div>

          {userSelected && (
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
                {selectedPost && (
                  <PostDetails
                    selectedPost={selectedPost}
                    setErrorNotification={setErrorNotification}
                    errorNotification={errorNotification}
                  />
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};
