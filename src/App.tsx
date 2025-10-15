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
import { getPostsByUser, getUsers } from './utils/api';
import { Post } from './types/Post';

export const App = () => {
  // #region set for users
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  // #endregion

  // #region set for posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  // #endregion

  // load users 1
  useEffect(() => {
    const load = async () => {
      try {
        setUsersError(null);
        setUsersLoading(true);
        const data = await getUsers();

        setUsers(data);
      } catch (e) {
        setUsersError('Failed to load users');
      } finally {
        setUsersLoading(false);
      }
    };

    load();
  }, []);

  // when user changes, fetch post
  useEffect(() => {
    if (selectedUserId === null) {
      setPosts([]);
      setSelectedPostId(null);
      setPostError(null);

      return;
    }

    const load = async () => {
      try {
        setPostError(null);
        setPostLoading(true);
        const data = await getPostsByUser(selectedUserId);

        setPosts(data);
        setSelectedPostId(null);
      } catch {
        setPostError('Failed to load posts');
        setPosts([]);
      } finally {
        setPostLoading(false);
      }
    };

    load();
  }, [selectedUserId]);

  const selectedPost = selectedPostId
    ? posts.find(p => p.id === selectedPostId) || null
    : null;

  const handleSelectPost = (id: number) => {
    setSelectedPostId(prev => (prev === id ? null : id));
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
                  isLoading={usersLoading}
                  error={usersError}
                  selectedUserId={selectedUserId}
                  onSelect={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {selectedUserId && (
                  <>
                    {postLoading && <Loader />}

                    {postError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!postLoading && !postError && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!postLoading && !postError && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPostId={selectedPostId}
                        onSelect={handleSelectPost}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                postId={selectedPost ? selectedPost.id : null}
                title={selectedPost?.title}
                body={selectedPost?.body}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
