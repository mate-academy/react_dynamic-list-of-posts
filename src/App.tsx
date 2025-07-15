/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { User } from './types/User';
import { fetchClient } from './utils/fetchClient';
import { Post } from './types/Post';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [hasErrorUsers, setHasErrorUsers] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasErrorPosts, setHasErrorPosts] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const selectedPost = posts.find(post => post.id === selectedPostId) || null;

  useEffect(() => {
    setIsLoadingUsers(true);
    fetchClient
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setHasErrorUsers(true))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);

      return;
    }

    setIsLoadingPosts(true);
    setHasErrorPosts(false);

    fetchClient
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(setPosts)
      .catch(() => setHasErrorPosts(true))
      .finally(() => setIsLoadingPosts(false));
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
                  onUserSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isLoadingPosts && <Loader />}

                {selectedUser && hasErrorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !isLoadingPosts &&
                  !hasErrorPosts &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  !isLoadingPosts &&
                  !hasErrorPosts &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPostId}
                      onPostSelect={setSelectedPostId}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  onClose={() => setSelectedPostId(null)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
