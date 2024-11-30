/* eslint-disable @typescript-eslint/indent */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import cn from 'classnames';
import './App.scss';

import { PostsList, PostDetails, UserSelector, Loader } from './components';
import { User } from './types';
import { usePosts, useUsers } from './hooks';

export const App = () => {
  const {
    users,
    errorMessage: usersErrorMessage,
    selectedUser,
    setSelectedUser,
  } = useUsers();
  const {
    posts,
    selectedPost,
    setSelectedPost,
    isLoading,
    errorMessage: postsErrorMessage,
  } = usePosts(selectedUser?.id);

  const errorMessage = usersErrorMessage || postsErrorMessage;

  const handleSelectUserId = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

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
                  onSelectUser={handleSelectUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isLoading && <Loader />}

                {selectedUser && !isLoading && errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser &&
                  !isLoading &&
                  !errorMessage &&
                  posts?.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  !isLoading &&
                  !errorMessage &&
                  posts?.length !== 0 && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelectPost={setSelectedPost}
                    />
                  )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
