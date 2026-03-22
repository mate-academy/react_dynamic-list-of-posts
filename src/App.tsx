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
import { getPosts, getUsers } from './api/post';
import { Post } from './types/Post';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    getUsers()
      .then((usersFromServer: User[]) => setUsers(usersFromServer))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setPosts([]);

      return;
    }

    setPostsLoading(true);
    setError(false);
    setSelectedPost(null);

    getPosts(selectedUserId)
      .then((postsFromServer: Post[]) => setPosts(postsFromServer))
      .catch(() => setError(true))
      .finally(() => setPostsLoading(false));
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUserId}
                  onSelect={(userId: number) => setSelectedUserId(userId)}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {postsLoading && <Loader />}

                    {!loading && error && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!postsLoading && !error && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!postsLoading && !error && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        onSelectedPost={post => {
                          setSelectedPost(post);
                        }}
                      />
                    )}
                  </>
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
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
