import classNames from 'classnames';

import { PostsList } from './PostList/PostsList';
import { PostDetails } from './PostDetails/PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { usePosts } from '../hooks/usePosts';
import { ErrorMessages } from '../types/ErrorMessages';
import { useState } from 'react';

export const AppPosts = () => {
  const [currentError, setCurrentError] = useState<ErrorMessages | null>(null);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState<boolean>(false);
  const {
    posts,
    isOpenSidebar,
    setIsOpenSidebar,
    selectedUser,
    selectedPost,
    setSelectedPost,
    handleSelectUser,
    users,
    isLoadingPosts,
  } = usePosts(setCurrentError);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  handleSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <div className="block" data-cy="MainContent">
                  {isLoadingPosts ? (
                    <Loader />
                  ) : currentError === ErrorMessages.PostsLoadingError ? (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      {currentError}
                    </div>
                  ) : selectedUser ? (
                    posts.length > 0 ? (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        setIsOpenSidebar={setIsOpenSidebar}
                        setIsOpenCommentForm={setIsOpenCommentForm}
                      />
                    ) : (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )
                  ) : (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  )}
                </div>
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
              { 'Sidebar--open': isOpenSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  currentError={currentError}
                  setCurrentError={setCurrentError}
                  isOpenCommentForm={isOpenCommentForm}
                  setIsOpenCommentForm={setIsOpenCommentForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
