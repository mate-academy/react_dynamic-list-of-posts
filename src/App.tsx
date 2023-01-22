import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { ErrorNotification } from './components/ErrorNotification';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [isPostsLoadingError, setIsPostsLoadingError] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isNewCommentFormOpened, setIsNewCommentFormOpened] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const selectUserId = useCallback((userId: number) => {
    setSelectedUserId(userId);
    setIsLoading(true);
  }, []);

  const selectPostId = useCallback((postId: number) => {
    setSelectedPostId(prev => (prev !== postId ? postId : 0));
    setIsNewCommentFormOpened(false);
  }, []);

  const resetSelectedPostId = useCallback(() => {
    setSelectedPostId(0);
  }, []);

  const openNewCommentForm = useCallback(() => {
    setIsNewCommentFormOpened(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      getPosts(selectedUserId)
        .then(loadedPosts => {
          setPosts(loadedPosts);
          setIsPostsLoaded(true);
          setIsPostsLoadingError(false);
        })
        .catch(() => {
          setIsPostsLoadingError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUserId]);

  const isLoadedPostsExist = !isLoading
    && !isPostsLoadingError
    && isPostsLoaded
    && posts.length > 0;

  const isLoadedPostsNotExist = !isLoading
    && !isPostsLoadingError
    && isPostsLoaded
    && !posts.length;

  const isLoadedError = !isLoading && isPostsLoadingError;

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelectUserId={selectUserId}
                  onResetPostId={resetSelectedPostId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isLoadedError && (
                  <ErrorNotification error={Errors.PostsLoadingError} />
                )}

                {isLoadedPostsExist && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelectPostId={selectPostId}
                  />
                )}

                {isLoadedPostsNotExist && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPostId },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  postDetails={selectedPost}
                  isNewCommentFormOpened={isNewCommentFormOpened}
                  onOpenNewCommentForm={openNewCommentForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
