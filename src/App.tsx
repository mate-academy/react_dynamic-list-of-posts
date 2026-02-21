import React, { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useUsers } from './hooks/useUsers';
import { usePosts } from './hooks/usePosts';
import { useComments } from './hooks/useComments';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

interface SelectionState {
  user: User | null;
  post: Post | null;
}

export const App: React.FC = () => {
  const { users, usersLoading, usersError } = useUsers();
  const [{ user: selectedUser, post: selectedPost }, setSelection] =
    useState<SelectionState>({
      user: null,
      post: null,
    });

  const handleUserSelect = (user: User) => {
    setSelection({ user, post: null });
  };

  const handlePostSelect = (post: Post | null) => {
    setSelection(prev => ({ ...prev, post }));
  };

  const { posts, postsLoading, postsError } = usePosts(
    selectedUser?.id || null,
  );

  const {
    comments,
    commentsLoading,
    commentsError,
    handleAddComment,
    handleDeleteComment,
  } = useComments(selectedPost?.id || null);

  const noPosts =
    !!selectedUser && !postsLoading && !postsError && posts.length === 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {usersLoading && <Loader />}

                {usersError && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    Failed to load users
                  </div>
                )}

                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelected={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!postsLoading && !postsError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelect={handlePostSelect}
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
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  commentsLoading={commentsLoading}
                  commentsError={commentsError}
                  onAdd={handleAddComment}
                  onDelete={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
