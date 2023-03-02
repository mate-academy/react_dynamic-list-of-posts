import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './utils/users';
import { Post } from './types/Post';
import { getUserPosts } from './utils/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const loadUsers = async () => {
    setIsError(false);
    try {
      const usersFromServer = await getUsers();
      const validUserNames = usersFromServer
        .filter(user => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm.test(user.name));

      setUsers(validUserNames);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async () => {
    if (!selectedUserId) {
      return;
    }

    setIsLoadingPosts(true);
    setIsProcessed(false);

    try {
      const postFromServer = await getUserPosts(selectedUserId);

      setPosts(postFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoadingPosts(false);
      setIsProcessed(true);
    }
  };

  useEffect(() => {
    loadPosts();
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
                  setSelectedPostId={setSelectedPostId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Unable to load posts!
                  </div>
                )}

                {posts.length > 0 && !isLoadingPosts && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    setSelectedPostId={setSelectedPostId}
                  />
                )}

                {!posts.length && isProcessed && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
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
              { 'Sidebar--open': !!selectedPostId },
            )}
          >
            {!!selectedPostId && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPostId={selectedPostId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
