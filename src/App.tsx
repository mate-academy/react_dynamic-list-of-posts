import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useState, useEffect } from 'react';
import { Post } from './types/Post';
import { getPostByUserId } from './utils/services';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    setLoading(true);
    setIsError('');
    setPosts([]); // очищуємо старі пости
    setSelectedPost(null); //закрити сайдбар

    getPostByUserId(selectedUserId)
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setIsError('Error loading posts');
      });
  }, [selectedUserId]);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userId={selectedUserId}
                  onUserSelect={handleUserSelect}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {isError && selectedUserId && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 &&
                  !loading &&
                  selectedUserId > 0 &&
                  !isError && (
                    <>
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    </>
                  )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
