import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getPosts, getUsers } from './helpers/users';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [arePostLoading, setArePostLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch {
      throw new Error('Something went wrong!');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = useCallback(async () => {
    if (selectedUser) {
      setArePostLoading(true);

      try {
        const loadedPosts = await getPosts(selectedUser?.id);

        setPosts(loadedPosts);
        setIsLoadingError(false);
      } catch {
        setIsLoadingError(true);
      } finally {
        setArePostLoading(false);
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    loadPosts();

    setSelectedPost(null);
  }, [selectedUser, loadPosts]);

  const noPostCondition = (
    !arePostLoading
    && !isLoadingError
    && !posts.length
    && selectedUser
  );

  const postCondition = (
    !!posts.length
    && !isLoadingError
    && !arePostLoading
  );

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
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {arePostLoading && <Loader />}

                {(!arePostLoading && isLoadingError) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostCondition && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {postCondition && (
                  <PostsList
                    posts={posts}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
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
