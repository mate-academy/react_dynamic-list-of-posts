import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const shouldShowPostsList =
    !isPostsLoading && !postsError && posts.length > 0;

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedPost(null);
  };

  useEffect(() => {
    setIsLoading(true);
    setError('');

    client
      .get<User[]>('/users')
      .then(usersFromApi => {
        setUsers(usersFromApi);
      })
      .catch(() => {
        setError('Unable to load users');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    setIsPostsLoading(true);
    setPostsError('');

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(postsFromApi => {
        setPosts(postsFromApi);
      })
      .catch(() => {
        setPostsError('Unable to load posts');
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUserId]);

  const handlePostSelect = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

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
                  onSelect={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isLoading && !error && (
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

                {isPostsLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {!isPostsLoading && !postsError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPostsList && (
                  <PostsList
                    posts={posts}
                    onPostSelect={handlePostSelect}
                    selectedPostId={selectedPost?.id ?? null}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
