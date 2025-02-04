import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { client } from './utils/fetchClient';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { Sidebar } from './components/Sidebar';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const shouldShowPosts = selectedUser && !isLoading && posts.length > 0;
  const shouldShowNoPosts =
    selectedUser && !isLoading && posts.length === 0 && !error;

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setError('Unable to load users'));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setPosts([]);
      setSelectedPost(null);
      setError(null);

      client
        .get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(setPosts)
        .catch(() => setError('Unable to load posts'))
        .finally(() => setIsLoading(false));
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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
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

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPosts && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <Sidebar selectedPost={selectedPost} />
        </div>
      </div>
    </main>
  );
};
