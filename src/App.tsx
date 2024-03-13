import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUserPosts } from './api/api';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [isCommentFormActive, setIsCommentFormActive] = useState(false);

  const isVisiblePosts = !!visiblePosts.length && !isLoading && !isError;
  const isNoPosts =
    selectedUser && !visiblePosts.length && !isLoading && !isError;

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const handleSelectPost = (post: Post | null) => {
    setSelectedPost(post);
  };

  const handleCommentForm = (value: boolean) => {
    setIsCommentFormActive(value);
  };

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getUserPosts(selectedUser.id)
        .then(posts => setVisiblePosts(posts))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }

    return () => setIsLoading(false);
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
                  onChangeUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isVisiblePosts && (
                  <PostsList
                    posts={visiblePosts}
                    selectedPost={selectedPost}
                    onPostSelect={handleSelectPost}
                    onFormStatusChange={handleCommentForm}
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
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isCommentFormActive={isCommentFormActive}
                  onFormStatusActive={handleCommentForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
