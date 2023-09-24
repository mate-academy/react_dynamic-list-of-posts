import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      setTimeout(() => {
        getPosts(selectedUser)
          .then(setPosts)
          .finally(() => setLoading(false));
      }, 300);
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  isDropdown={isDropdownOpen}
                  handleDropdown={setIsDropdownOpen}
                  selectedUser={selectedUser}
                  handleSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {(!selectedUser && !loading) && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && (<Loader />)}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser
                  && !loading
                  && posts.length === 0
                  && !isDropdownOpen
                  && !isError && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(posts.length > 0 && !isError && !loading && selectedUser)
                && (
                  <PostsList
                    posts={posts}
                    // isSidebarOpen={openSidebar}
                    handleOpenSidebar={setOpenSidebar}
                    selectedPost={selectedPost}
                    handleSelectedPost={setSelectedPost}
                  />
                )}

                {/* <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>

                <PostsList /> */}
              </div>
            </div>
          </div>

          {posts && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': openSidebar },
              )}
            >
              {selectedPost && (
                <div className="tile is-child box is-success ">
                  <PostDetails
                    selectedPost={selectedPost}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
