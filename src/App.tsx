import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { Post } from './types/Post';
import { User } from './types/User';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [usersError, setUsersError] = useState('');
  const [postsError, setPostsError] = useState('');

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoadingUsers(true);
      setUsersError('');

      try {
        const loadedUsers = await getUsers();

        setUsers(loadedUsers);
      } catch {
        setUsersError('Somthing went wrong');
      } finally {
        setIsLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    const loadPosts = async () => {
      setPosts([]);
      setIsLoadingPosts(true);
      setPostsError('');

      try {
        const loadedPost = await getPosts(selectedUserId);

        setPosts(loadedPost);
      } catch {
        setPostsError('Failed to load posts');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {isLoadingUsers ? (
                  <Loader />
                ) : usersError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {usersError}
                  </div>
                ) : (
                  <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : isLoadingPosts ? (
                  <Loader />
                ) : postsError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                ) : posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    setSelectedPostId={setSelectedPostId}
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
