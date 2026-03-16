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
import { Post } from './types/Post';
import * as services from './api';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    services
      .getUsers()
      .then(setUsers)
      .catch(() => {
        setError('Something went wrong!');
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setError('');
      setPosts([]);
      setSelectedPost(null);
      setIsLoading(true);

      services
        .getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => {
          setError('Something went wrong!');
        })
        .finally(() => {
          setIsLoading(false);
        });
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
                  users={users}
                  selectedUser={selectedUser}
                  onSelectUser={user => setSelectedUser(user)}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}
                {error.length !== 0 && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}{' '}
                {selectedUser && !error && !isLoading && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {selectedUser && posts.length > 0 && !error && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onSelectPost={post => setSelectedPost(post || null)}
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
              selectedPost !== null && selectedPost.userId === selectedUser?.id
                ? 'Sidebar--open'
                : '',
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost !== null && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
