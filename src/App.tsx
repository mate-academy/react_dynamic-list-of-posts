import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setError('Failed to load users'));
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      setPosts([]);
      setSelectedPostId(null); // Скидаємо selectedPostId синхронно

      return;
    }

    setIsLoadingPosts(true);
    setError(null);
    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(newPosts => {
        setPosts(newPosts);
        // Перевіряємо, чи selectedPostId все ще валідний
        if (
          selectedPostId &&
          !newPosts.some(post => post.id === selectedPostId)
        ) {
          setSelectedPostId(null);
        }
      })
      .catch(() => setError('Failed to load posts'))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedPostId, selectedUserId]); // Видаляємо selectedPostId із залежностей

  const handleSelectPost = (postId: number) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  const selectedPost =
    selectedPostId !== null
      ? posts.find(post => post.id === selectedPostId)
      : null;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelect={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : isLoadingPosts ? (
                  <Loader />
                ) : error ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelectPost={handleSelectPost}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  onClose={() => setSelectedPostId(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
