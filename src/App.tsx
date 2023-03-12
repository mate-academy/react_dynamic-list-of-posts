import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { getUsers, getUserPosts } from './helpers';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(-1);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const loadDataUsers = async () => {
    try {
      const usersData = await getUsers();

      setUsers(usersData);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadDataUsers();
  }, []);

  const selectedUserHandleChange = useCallback((value: number) => {
    setSelectedUserId(value);
  }, [selectedUserId]);

  const loadDataUserPosts = async () => {
    try {
      setIsLoading(true);
      const postsData = await getUserPosts(selectedUserId);
      setUserPosts(postsData);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataUserPosts();
  }, [selectedUserId]);

  const selectedPostHandleChange = useCallback((value: number | null) => {
    setSelectedPostId(value);
  }, [selectedPostId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectUserId={selectedUserHandleChange}
                  userId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId < 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUserId !== -1 && !userPosts.length && !isLoading && (
                  <p className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </p>
                )}

                {!!userPosts.length && !isLoading && (
                  <PostsList
                    posts={userPosts}
                    selectPost={selectedPostHandleChange}
                    selectedPostId={selectedPostId}
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
              { 'Sidebar--open': selectedPostId },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails postId={selectedPostId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
