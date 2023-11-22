import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
// import { Loader } from './components/Loader';
import { User } from './types/User';
import { getAllUsers, getUserPosts } from './utils/api';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getAllUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setVisiblePosts([]);
    }

    getUserPosts(selectedUserId as number)
      .then(setVisiblePosts);
  }, [selectedUserId]);

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
                  setSelectedUserId={setSelectedUserId}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {!selectedUserId ? (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                ) : selectedUserId && visiblePosts.length > 0 ? (
                  <PostsList
                    posts={visiblePosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                ) : (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {/* <Loader />

                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div> */}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
