import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [arePostsLoading, setArePostsLoading] = useState(false);
  const [hasPostsLoadingError, setHasPostsLoadingError] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers);
  }, []);

  const getPosts = (user: User) => {
    setPosts(null);
    setSelectedPost(null);
    setOpenSidebar(false);
    setHasPostsLoadingError(false);
    setArePostsLoading(true);

    client.get<Post[]>(`/posts?userId=${user.id}`)
      .then(setPosts)
      .catch(() => setHasPostsLoadingError(true))
      .finally(() => setArePostsLoading(false));
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
                  setSelectedUser={setSelectedUser}
                  // setPosts={setPosts}
                  getPosts={getPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {!selectedUser && 'No user selected'}
                </p>

                {arePostsLoading && <Loader />}

                {hasPostsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts && posts.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {posts && posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    setOpenSidebar={setOpenSidebar}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              {
                'Sidebar--open': openSidebar,
              },
            )}
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
