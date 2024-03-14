import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Post } from './types/Post';
import { getPosts } from './services/posts';
import { User } from './types/User';
import { getUsers } from './services/users';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getUsers().then(u => {
      setUsers(u);
    });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoading(true);
    setHasError(false);
    setUserPosts([]);
    setSelectedPost(null);

    getPosts(selectedUser.id)
      .then(setUserPosts)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && !hasError && (
                  <>
                    {!userPosts.length && !loading && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!!userPosts.length && !hasError && selectedUser && (
                      <PostsList
                        posts={userPosts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    )}
                  </>
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && selectedUser && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
