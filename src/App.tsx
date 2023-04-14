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
  const [selectedPost, setSelectedPost] = useState(0);

  const loadUsers = useCallback(async () => {
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
      setSidebar(false);
      const posts = await getPosts(userId);

      setPosts(posts);
    } catch (error) {
      setLoadingError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPostDetails = useCallback((id: number) => {
    const getSelectedPost = postsFromServer?.find(post => post.id === id);

    if (getSelectedPost) {
      return getSelectedPost;
    }

    return null;
  }, [postsFromServer]);

  useEffect(() => {
    loadUsers();
  }, []);

  const getSelectedPost = getPostDetails(selectedPost);

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

                {isLoading && <Loader />}

                {!postsFromServer
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

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

                {postsFromServer && !!postsFromServer.length
                  && (
                    <PostsList
                      posts={postsFromServer}
                      hasSidebar={hasSidebar}
                      setSidebar={setSidebar}
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
              { 'Sidebar--open': hasSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {getSelectedPost && (
                <PostDetails
                  post={getSelectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
