import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [postsFetched, setPostsFetched] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleOpenPosts = (userId: number) => {
    setLoading(true);
    setError('');
    setPostsFetched(false);

    getUserPosts(userId)
      .then(fetchedPosts => {
        setPosts(fetchedPosts);
        setPostsFetched(true);
      })
      .catch(() => {
        setError('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedUser) {
      handleOpenPosts(selectedUser.id);
      setSelectedPost(null);
    }
  }, [selectedUser]);

  const isPostEmpty =
    selectedUser && !loading && !posts.length && !error && postsFetched;

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
                  onSelectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {isPostEmpty && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!error && selectedUser && !!posts.length && !loading && (
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
