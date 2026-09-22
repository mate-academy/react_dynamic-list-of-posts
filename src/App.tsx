/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts, getUsers } from './api/api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setSelectedPost(null);
      setIsLoadingPosts(false);
      setHasPostsError(false);

      return;
    }

    setIsLoadingPosts(true);
    setHasPostsError(false);
    setSelectedPost(null);

    getUserPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setHasPostsError(true))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUser]);

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
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
                  onSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {!isLoadingPosts && hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoadingPosts &&
                  !hasPostsError &&
                  selectedUser &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!isLoadingPosts &&
                  !hasPostsError &&
                  selectedUser &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelectPost={handleSelectPost}
                      onClosePost={() => setSelectedPost(null)}
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
                'Sidebar--open': selectedPost !== null,
              },
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
