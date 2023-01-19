import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isLoadingPostsFinish, setIsLoadingPostsFinish] = useState(false);
  const [isErrorOnPostsLoading, setIsErrorOnPostsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch (error) {
      throw new Error('Can\'t load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async (userId: number) => {
    try {
      setIsPostsLoading(true);
      setIsLoadingPostsFinish(false);

      const loadedPosts = await getPosts(userId);

      setPosts(loadedPosts);

      setIsPostsLoading(false);
      setIsLoadingPostsFinish(true);
    } catch (error) {
      setIsErrorOnPostsLoading(true);
    } finally {
      setIsPostsLoading(false);
      setIsLoadingPostsFinish(true);
    }
  };

  const selectedUser = useMemo(() => (
    users.find(user => user.id === selectedUserId)
  ), [selectedUserId]);

  useEffect(() => {
    if (selectedUser) {
      loadPosts(selectedUser.id);
    }
  }, [selectedUser]);

  const selectedPost = useMemo(() => (
    posts.find(post => post.id === selectedPostId)
  ), [selectedPostId]);

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
                  onUserSelect={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoading && <Loader />}

                {isErrorOnPostsLoading
                  && isLoadingPostsFinish
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                {isLoadingPostsFinish
                  && !isErrorOnPostsLoading
                  && posts.length === 0
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {posts.length > 0 && isLoadingPostsFinish && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPostId={setSelectedPostId}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost && selectedUser
                  && selectedPost.userId === selectedUser.id,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
