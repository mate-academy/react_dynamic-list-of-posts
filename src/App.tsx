/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Sidebar } from './components/Sidebar';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export enum AppError {
  None,
  NoPosts,
  Default,
}

export const errorMessages: Record<AppError, string> = {
  [AppError.None]: '',
  [AppError.NoPosts]: 'No posts yet',
  [AppError.Default]: 'Something went wrong!',
};

export const App = () => {
  const [usersError, setUsersError] = useState<AppError>(AppError.None);
  const [postsError, setPostsError] = useState<AppError>(AppError.None);
  const [selectedUser, setSelectedUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('selectedUser');

    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved) as User;
    } catch {
      localStorage.removeItem('selectedUser');

      return null;
    }
  });

  const [clients, setClients] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setCurrentPost(null);
      setPostsError(AppError.None);

      return;
    }

    setIsPostsLoading(true);
    setPostsError(AppError.None);
    setCurrentPost(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(fetchedPosts => {
        if (fetchedPosts.length === 0) {
          setPosts([]);
          setPostsError(AppError.NoPosts);
        } else {
          setPosts(fetchedPosts);
          setPostsError(AppError.None);
        }
      })
      .catch(() => setPostsError(AppError.Default))
      .finally(() => setIsPostsLoading(false));
  }, [selectedUser]);

  useEffect(() => {
    setIsLoading(true);
    setUsersError(AppError.None);

    client
      .get<User[]>('/users')
      .then(setClients)
      .catch(() => setUsersError(AppError.Default))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent is-8">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  clients={clients}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {usersError === AppError.Default && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    {errorMessages[AppError.Default]}
                  </div>
                )}

                {!isLoading && !selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsError === AppError.Default && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessages[AppError.Default]}
                  </div>
                )}

                {!isPostsLoading && postsError === AppError.NoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    {errorMessages[AppError.NoPosts]}
                  </div>
                )}

                {isPostsLoading && <Loader />}

                {!isPostsLoading && selectedUser && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    currentPost={currentPost}
                    onSelect={setCurrentPost}
                  />
                )}
              </div>
            </div>
          </div>

          <Sidebar post={currentPost} />
        </div>
      </div>
    </main>
  );
};
