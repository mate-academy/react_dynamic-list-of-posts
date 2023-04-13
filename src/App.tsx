import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts, getUsers } from './utils/api';

export const App: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [usersFromServer, setUsers] = useState<User[]>([]);
  const [postsFromServer, setPosts] = useState<Post[] | null>(null);
  const [isLoadingError, setLoadingError] = useState(false);
  const [hasSidebar, setSidebar] = useState(false);
  const [selectPost, setSelectPost] = useState(0);

  const loadingUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getUsers();

      setUsers(users);
    } catch (error) {
      setLoadingError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadingPosts = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      const posts = await getPosts(userId);

      setPosts(posts);
    } catch (error) {
      setLoadingError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const showPostDetails = useCallback((id: number) => {
    const selectedPost = postsFromServer?.find(post => post.id === id);

    if (selectedPost) {
      return selectedPost;
    }

    return null;
  }, [postsFromServer]);

  useEffect(() => {
    loadingUsers();
  }, []);

  const selectedPost = showPostDetails(selectPost);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersFromServer}
                  loadingPosts={loadingPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!postsFromServer
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                {isLoading && <Loader />}

                {isLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {postsFromServer?.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {postsFromServer && postsFromServer.length !== 0
                  && (
                    <PostsList
                      posts={postsFromServer}
                      hasSidebar={hasSidebar}
                      setSidebar={setSidebar}
                      selectPost={selectPost}
                      setSelectPost={setSelectPost}
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
              { 'Sidebar--open': hasSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
