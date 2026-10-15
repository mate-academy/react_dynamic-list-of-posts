import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/user';
import { Post } from './types/Post';
import { getPostsByUserId } from './api/post';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const selectedUser = users.find(user => user.id === currentUserId) ?? null;

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const selectedPost =
    selectedUser && posts.find(post => post.id === selectedPostId);

  const successfulLoading = !loading && !isError;

  useEffect(() => {
    setIsError(false);
    getUsers()
      .then(response => setUsers(response))
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsError(false);
    setPosts([]);
    setLoading(true);

    getPostsByUserId(selectedUser.id)
      .then(response => setPosts(response))
      .catch(() => setIsError(true))
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
                  onSelect={setCurrentUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {successfulLoading &&
                  selectedUser &&
                  (posts.length > 0 ? (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPostId}
                      onSelect={setSelectedPostId}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}
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
              <PostDetails post={selectedPost as Post} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
