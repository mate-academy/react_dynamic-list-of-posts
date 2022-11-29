import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Loader } from './components/Loader';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadUsersError, setLoadUsersError] = useState<boolean>(false);
  const [loadPostsError, setLoadPostsError] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const getUsersFromApi = useCallback(async () => {
    try {
      const receivedUsers = await client.get<User[]>('users');

      setUsers(receivedUsers);
      setIsLoading(false);
    } catch {
      setLoadUsersError(true);
    }
  }, [users]);

  const getPostListFromApi = useCallback(async (user: User) => {
    try {
      setIsLoading(true);
      const receivedPostList = await client.get<Post[]>('posts');

      setPostList(receivedPostList.filter(post => post.userId === user.id));
      setIsLoading(false);
    } catch {
      setLoadPostsError(true);
    }
  }, [postList]);

  const getUser = useCallback((email: string) => {
    const foundUser = (users.find(user => user.email === email));

    if (foundUser === undefined) {
      return '';
    }

    return foundUser.name;
  }, [selectedPost]);

  useEffect(() => {
    getUsersFromApi();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  getPostList={getPostListFromApi}
                  setIsSidebar={setIsSidebar}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {!activeUser && 'No user selected'}
                </p>

                {isLoading && !loadUsersError && !loadPostsError && <Loader />}

                {(loadUsersError || loadPostsError) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {activeUser && postList.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                <PostsList
                  user={activeUser}
                  posts={postList}
                  isSidebar={isSidebar}
                  setIsSidebar={setIsSidebar}
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
                />
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
                'Sidebar--open': isSidebar,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                getUser={getUser}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
