/* eslint-disable no-console */
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
import { LoadingError } from './components/Notifications/LoadingError';
import { NoSelectedUser } from './components/Notifications/NoSelectedUser';
import { NoPostsYet } from './components/Notifications/NoPostsYet';
import { Post } from './types/Post';
import { getUsers, getPosts } from './utils/requests';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [arePostsLoaded, setArePostsLoaded] = useState(false);
  const [isLoadingErorr, setisLoadingErorr] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const noPostsCondition = arePostsLoaded
  && !isLoadingErorr
  && posts.length < 1;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: User[] = await getUsers();

        setUsers(data);
      } catch (error) {
        setisLoadingErorr(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUserId > -1) {
      setisLoadingErorr(false)
      setIsLoader(true);
      setArePostsLoaded(false);

      const fetchData = async (): Promise<void> => {
        try {
          const data: Post[] = await getPosts(selectedUserId);

          setPosts(data);
          setIsLoader(false);
          setArePostsLoaded(true);
        } catch (error) {
          setisLoadingErorr(true);
          setArePostsLoaded(true);
          setIsLoader(false);
        } finally {
          setArePostsLoaded(true);
          setIsLoader(false);
        }
      };

      fetchData();
    }
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {users && (
                  <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId < 0 && (
                  <NoSelectedUser />
                )}

                {isLoader && (
                  <Loader />
                )}

                {isLoadingErorr && (
                  <LoadingError />
                )}

                {noPostsCondition && (
                  <NoPostsYet />
                )}

                {posts.length >= 1 && (
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
