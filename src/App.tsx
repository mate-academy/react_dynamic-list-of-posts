import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { getPostByUserId } from './utils/services';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null); // вибраний користувач
  const [openUser, setOpenUser] = useState(false); // для вікритя користувачів
  const [error, setError] = useState(''); // помилка
  const [isLoading, setIsLoading] = useState(false); // завантаження
  const [posts, setPosts] = useState<Post[]>([]); // відображення постів
  const [postId, setPostId] = useState<Post | null>(null); //вибраний пост

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
    setOpenUser(false);
    setPostId(null);
    setPosts([]);
  };

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);

      return;
    }

    setIsLoading(true);
    setError('');

    getPostByUserId(selectedUser)
      .then(data => {
        setPosts(data);
      })
      .catch(() => {
        setError('Error');
        setPosts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  handleUserSelect={handleUserSelect}
                  selectedUser={selectedUser}
                  openUser={openUser}
                  setOpenUser={setOpenUser}
                  setError={setError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {error && selectedUser && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 && !isLoading && selectedUser && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setPostId}
                    selectedPosts={postId}
                    isLoading={isLoading}
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
              { 'Sidebar--open': postId },
            )}
          >
            <div className="tile is-child box is-success">
              {postId && <PostDetails posts={posts} postId={postId?.id} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
