import classNames from 'classnames';

import { PostsList } from './PostList/PostsList';
import { PostDetails } from './PostDetails/PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { usePosts } from '../hooks/usePosts';
import { ErrorMessages } from '../types/ErrorMessages';

export const AppPosts = () => {
  const {
    posts,
    comments,
    isLoadingPosts,
    isLoadingAdd,
    isOpenDropdown,
    isOpenSidebar,
    isOpenCommentForm,
    selectedUser,
    selectedPost,
    handleSelectUser,
    handleDeleteComment,
    handleInputName,
    handleInputEmail,
    handleInputMessage,
    toggleDropdown,
    toggleSidebar,
    toggleCommentForm,
    users,
    isLoadingComments,
    inputName,
    inputEmail,
    inputMessage,
    onResetForm,
    handleAddComment,
    dropdownRef,
    currentError,
  } = usePosts();

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  isOpenDropdown={isOpenDropdown}
                  selectedUser={selectedUser}
                  handleSelectUser={handleSelectUser}
                  toggleDropdown={toggleDropdown}
                  dropdownRef={dropdownRef}
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
                        toggleSidebar={toggleSidebar}
                        selectedPost={selectedPost}
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
                  comments={comments}
                  isOpenCommentForm={isOpenCommentForm}
                  toggleCommentForm={toggleCommentForm}
                  isLoadingComments={isLoadingComments}
                  handleDeleteComment={handleDeleteComment}
                  inputName={inputName}
                  inputEmail={inputEmail}
                  inputMessage={inputMessage}
                  handleInputName={handleInputName}
                  handleInputEmail={handleInputEmail}
                  handleInputMessage={handleInputMessage}
                  onResetForm={onResetForm}
                  handleAddComment={handleAddComment}
                  isLoadingAdd={isLoadingAdd}
                  currentError={currentError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
