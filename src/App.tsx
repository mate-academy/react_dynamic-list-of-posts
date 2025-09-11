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

export const App = () => {
  // #region hooks
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[] | null>(
    null,
  );
  // #endregion

  // #region effects
  useEffect(() => {
    client.get('/users').then(setUsers).catch();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setSelectedUserPosts(null);
      setSelectedPost(null);

      return;
    }

    setSelectedPost(null);

    const loadPosts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const posts = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`,
        );

        setSelectedUserPosts(posts);
      } catch {
        setError("Can't download posts");
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  // #endregion

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

                {!isLoading &&
                  !error &&
                  selectedUser &&
                  (selectedUserPosts && selectedUserPosts.length > 0 ? (
                    <PostsList
                      posts={selectedUserPosts}
                      selectedPost={selectedPost}
                      setSelectedPost={setSelectedPost}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}
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
                'Sidebar--open': !!selectedPost,
                'is-hidden': !selectedUser,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails selectedPost={selectedPost} />
              ) : (
                <p>Select a post to see details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
