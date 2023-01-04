import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { User } from './types/User';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [errorLoadingPosts, setErrorLoadingPosts] = useState(false);

  const loadUsers = useCallback(
    async () => {
      const userData = await client.get<User[]>('/users');

      setUsers(userData);
    }, [],
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = useCallback(
    async (userId: number) => {
      setIsPostsLoading(true);
      setErrorLoadingPosts(false);
      try {
        const postsData = await client.get<Post[]>(`/posts?userId=${userId}`);

        setPosts(postsData);
      } catch (error) {
        setErrorLoadingPosts(true);
      }

      setIsPostsLoading(false);
    }, [],
  );

  const fetchPostsForUser = useCallback((user: User) => {
    setSelectedUser(user);
    setPosts([]);
    loadPosts(user.id);
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
                  onUserSelect={fetchPostsForUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedUser && isPostsLoading && (
                  <Loader />
                )}

                {errorLoadingPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(selectedUser)
                  && (posts.length === 0)
                  && (!setErrorLoadingPosts)
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser && (posts.length > 0) && (
                  <PostsList
                    posts={posts}
                    onSelectPost={setSelectedPost}
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
                'Sidebar--open': selectedPost,
              },
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
