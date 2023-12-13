import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './utils/getUsers';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './utils/getPosts';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState(ErrorMessage.NO_ERROR);
  const [isLoading, setIsLoading] = useState(false);

  const [noPosts, setNoPosts] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [isOpenSidebar, setIsOpenSidebar] = useState<number | null>(null);

  const loadAllUsers = async () => {
    try {
      setIsError(ErrorMessage.NO_ERROR);
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setIsError(ErrorMessage.USERS);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadPosts = async (id: number) => {
    try {
      setNoPosts(false);
      setIsError(ErrorMessage.NO_ERROR);
      setIsLoading(true);
      const postsFromServer = await getPosts(id);

      if (postsFromServer.length === 0) {
        setNoPosts(true);
      }

      setPosts(postsFromServer);
    } catch {
      setIsError(ErrorMessage.POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      loadPosts(selectedUserId);
    }
  }, [selectedUserId]);

  const selectedPost = useMemo(() => {
    return posts.find(post => post.id === isOpenSidebar);
  }, [isOpenSidebar, posts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelectedUser={setSelectedUserId}
                  selectedUser={selectedUserId}
                  setIsOpenSidebar={setIsOpenSidebar}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {(posts.length > 0 && !isLoading) && (
                  <PostsList
                    posts={posts}
                    setIsOpen={setIsOpenSidebar}
                    isOpen={isOpenSidebar}
                  />
                )}
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {isError}
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
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
              { 'Sidebar--open': isOpenSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails selectedPost={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
