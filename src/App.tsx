import React, { SetStateAction, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Router } from './routes/Router';
import { User } from './types/User';
import * as Services from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<SetStateAction<string>>('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    Services.client
      .get<User[]>('/users')
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
      })
      .catch(() => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [error]);

  useEffect(() => {
    Services.client
      .get<Post[]>(`/posts?userId=${selectedUser?.id}`)
      .then(fetchedPosts => {
        setPosts(fetchedPosts);
      })
      .catch(() => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [error, selectedUser?.id]);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setError('');
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
                  onUserSelect={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>
              <Router
                posts={posts}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
              />
              {isLoading && <Loader />}
              <div className="block" data-cy="MainContent">
                {!selectedUser && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && !isLoading && posts.length === 0 && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    isDetailOpen={isDetailOpen}
                    setIsDetailOpen={setIsDetailOpen}
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
              { 'Sidebar--open': isDetailOpen },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
