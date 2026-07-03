import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { usePosts } from './hooks/usePosts';

export const App = () => {
  const {
    users,
    selectedUser,
    handleSelectUser,
    isPostsLoading,
    postsError,
    posts,
    selectedPost,
    handlePostClick,
    comments,
    commentsError,
    isCommentsLoading,
    handleAddComment,
    handleDeleteComment,
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
                  selectedUser={selectedUser}
                  selectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {/* eslint-disable @typescript-eslint/indent */}
                {!isPostsLoading &&
                  !postsError &&
                  selectedUser &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!isPostsLoading &&
                  !postsError &&
                  selectedUser &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id || null}
                      onPostClick={handlePostClick}
                    />
                  )}
                {/* eslint-enable @typescript-eslint/indent */}
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
              <PostDetails
                post={selectedPost}
                comments={comments}
                error={commentsError}
                loading={isCommentsLoading}
                onDeleteComment={handleDeleteComment}
                onAddComment={handleAddComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
