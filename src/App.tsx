import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/Users';
import { Post } from './types/Post';
import { getPostsByUserId } from './api/Posts';

type ApiError = {
  source: 'users' | 'posts';
  message: string;
} | null;

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setApiError({
          source: 'users',
          message: 'Could not load users',
        });
      });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setIsPostsLoading(false);

      return;
    }

    setPosts([]);
    setApiError(null);
    setIsPostsLoading(true);

    getPostsByUserId(selectedUser.id)
      .then(loadedPosts => {
        setPosts(loadedPosts);
      })
      .catch(() => {
        setApiError({
          source: 'posts',
          message: 'Could not load posts',
        });
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUser]);

  useEffect(() => {
    if (!apiError) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setApiError(null);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [apiError]);

  const handlePostSelect = (post: Post) => {
    setSelectedPost(currentPost => (currentPost?.id === post.id ? null : post));
  };

  const handleUserSelected = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const renderMainContent = () => {
    if (!selectedUser) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    if (isPostsLoading) {
      return <Loader />;
    }

    if (apiError?.source === 'posts') {
      return (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    return (
      <PostsList
        posts={posts}
        selectedPost={selectedPost}
        onPostSelect={handlePostSelect}
      />
    );
  };

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
                  onUserSelected={handleUserSelected}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {renderMainContent()}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
