import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList/PostsList';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { PostDetails } from './components/PostDetails';
import classNames from 'classnames';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // #region load
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  // #endregion

  const handleLoadPosts = async (userId: number) => {
    setIsLoading(true);
    setPosts([]);
    setNotification('');
    setSelectedPost(null);

    try {
      const loadedPosts = await getPosts(userId);

      if (loadedPosts.length === 0) {
        setNotification('is-warning');
      }

      setPosts(loadedPosts);
    } catch {
      setNotification('is-danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onSelect={handleLoadPosts} />
              </div>

              <div className="block" data-cy="MainContent">
                {!isLoading && posts.length === 0 && !notification && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {!isLoading && posts.length > 0 && (
                  <PostsList posts={posts} onSelect={setSelectedPost} />
                )}
                {isLoading && <Loader />}

                {notification === 'is-danger' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {notification === 'is-warning' && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
              <div className="tile is-child box is-success">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
