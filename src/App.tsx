import classNames from 'classnames';
import { useState, useEffect } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { getUserPosts } from './api/userPosts';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postsState, setPostsState] = useState({
    isLoading: false,
    hasError: false,
    items: [] as Post[],
  });

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setPostsState({ isLoading: true, hasError: false, items: [] });

    getUserPosts(selectedUser.id)
      .then(data => {
        setPostsState({ isLoading: false, hasError: false, items: data });
      })
      .catch(() => {
        setPostsState({ isLoading: false, hasError: true, items: [] });
      });
  }, [selectedUser]);

  const handleSelectUser = (user: User) => {
    if (selectedUser?.id === user.id) {
      return;
    }

    setSelectedUser(user);
    setSelectedPost(null);
  };

  const showNoPosts =
    selectedUser &&
    !postsState.isLoading &&
    !postsState.hasError &&
    postsState.items.length === 0;

  const showPosts =
    selectedUser &&
    !postsState.isLoading &&
    !postsState.hasError &&
    postsState.items.length > 0;

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
                  onSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsState.isLoading && <Loader />}

                {postsState.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPosts && (
                  <PostsList
                    posts={postsState.items}
                    selectedPost={selectedPost}
                    onSelectPost={setSelectedPost}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
