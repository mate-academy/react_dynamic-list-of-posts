import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { useState, useEffect } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then(fetchedUsers => {
      setUsers(fetchedUsers);
    });
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      return;
    }

    setPostsLoading(true);
    setError('');
    setPosts([]);

    setSelectedPost(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(postsFromServer => {
        setPosts(postsFromServer);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setPostsLoading(false);
      });
  }, [selectedUserId]);

  const hasSelectedUser = selectedUserId !== null;
  const isReady = hasSelectedUser && !postsLoading && !error;

  const hasNoPosts = isReady && posts.length === 0;

  const shouldShowPost = isReady && posts.length > 0;

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
                  onUserSelected={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!hasSelectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsLoading && <Loader />}
                {error && !postsLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPost && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelected={setSelectedPost}
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
            <div className="tile is-child box is-success ">
              <PostDetails selectedPost={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
