import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getPosts } from './api';

import { Post } from './types/Post';

export const App = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPosts = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const postsData = await getPosts(id);

      setPosts(postsData || []);
    } catch {
      setError('Something went wrong!');
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts(userId);
    } else {
      setPosts([]);
      setError(null);
    }
  }, [userId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userId={userId}
                  setUserId={setUserId}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {userId ? (
                  <>
                    {isLoading ? (
                      <Loader />
                    ) : error ? (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {error}
                      </div>
                    ) : posts.length > 0 ? (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    ) : (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                  </>
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames({
              tile: true,
              'is-parent': true,
              'is-8-desktop': true,
              Sidebar: true,
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
