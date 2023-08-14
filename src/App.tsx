import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/user';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noPosts, setNoPosts] = useState(false);

  const fetchUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = useCallback((user: User) => {
    if (user.id !== selectedUserId) {
      setSelectedUserId(user.id);
      setSelectedPostId(0);
      setPosts([]);
    }
  }, [selectedUserId]);

  const fetchUserPosts = async () => {
    setError(false);
    setNoPosts(false);
    setLoading(true);

    try {
      const postsFromServer = await getPosts(selectedUserId);

      if (postsFromServer.length === 0) {
        setNoPosts(true);
      }

      setPosts(postsFromServer);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchUserPosts();
    }
  }, [selectedUserId]);

  const selectedPost = useMemo(() => {
    return posts.find(post => post.id === selectedPostId);
  }, [selectedPostId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserSelect={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onPostSelect={setSelectedPostId}
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
              { 'Sidebar--open': selectedPostId > 0 },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
