import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';

import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [user, setUser] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState<Post | null>(null);

  const loadApiPosts = async (userId: number) => {
    try {
      setIsLoading(true);
      const data = await getPosts(userId);

      if (!data.length) {
        setError('No posts yet');
      }

      setPosts(data);
    } catch {
      setError('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPost(null);

    if (user) {
      loadApiPosts(user);
    }
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  user={user}
                  setUser={setUser}
                  setError={setError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {error === 'Something went wrong!' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts.length && user !== 0 && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    post={post}
                    setPost={setPost}
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
              { 'Sidebar--open': post },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails
                  post={post}
                  setError={setError}
                  error={error}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
