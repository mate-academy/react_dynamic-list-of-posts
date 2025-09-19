import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { client } from './utils/fetchClient';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { User } from './types/User';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setError('');
      setLoading(true);
      client
        .get<Post[]>('/posts?userId=' + selectedUser?.id)
        .then(setPosts)
        .catch(() => setError('Something went wrong!'))
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onSelectedUser={setSelectedUser}
                  onCurrentPost={setCurrentPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading ? (
                  <Loader />
                ) : (
                  (error && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      {error}
                    </div>
                  )) ||
                  (posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      currentPost={currentPost}
                      onCurrentPost={setCurrentPost}
                      onShowForm={setShowForm}
                    />
                  )) ||
                  (posts.length === 0 && selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))
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
              { 'Sidebar--open': currentPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && (
                <PostDetails
                  currentPost={currentPost}
                  showForm={showForm}
                  onShowForm={setShowForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
