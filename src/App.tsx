import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [hasUserPostsLoadError, setHasUserPostsLoadError] = useState(false);
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(false);
  const [isUserPostsEmpty, setIsUserPostsEmpty] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [isNewCommentFormActive, setIsNewCommentFormActive] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setOpenedPost(null);
    setUserPosts(null);
  };

  useEffect(() => {
    setIsUserPostsEmpty(false);

    if (selectedUser) {
      setIsUserPostsLoading(true);

      client.get<Post[]>(`/posts?userId=${selectedUser?.id}`)
        .then(users => {
          setUserPosts(users);

          if (!users.length) {
            setIsUserPostsEmpty(true);
          }
        })
        .catch(() => setHasUserPostsLoadError(true))
        .finally(() => {
          setIsUserPostsLoading(false);
        });
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector setUser={handleUserSelect} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isUserPostsLoading && (
                  <Loader />
                )}

                {hasUserPostsLoadError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isUserPostsEmpty && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {!!userPosts?.length && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={openedPost}
                    openPost={setOpenedPost}
                    setIsNewCommentFormActive={setIsNewCommentFormActive}
                  />
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
              'Sidebar', {
                'Sidebar--open': openedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {openedPost && (
                <PostDetails
                  post={openedPost}
                  isNewCommentFormActive={isNewCommentFormActive}
                  setIsNewCommentFormActive={setIsNewCommentFormActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
