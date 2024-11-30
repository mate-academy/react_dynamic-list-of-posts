import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getUsersPost = useCallback((userId: User['id']) => {
    setError('');
    setIsLoading(true);

    getPosts(userId)
      .then(setPosts)
      .catch(() => setError('Unable to load posts!'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setError('');

    getUsers()
      .then(setUsers)
      .catch(() => setError('Unable to load users!'));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userSelected={userSelected}
                  setUserSelected={setUserSelected}
                  getUsersPost={getUsersPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && !error && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {userSelected && !error && posts.length === 0 && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isLoading && userSelected && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': !!selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {!!selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
