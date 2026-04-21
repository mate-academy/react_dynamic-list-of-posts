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
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [usersLoadingError, setUsersLoadingError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const selectedPost = posts.find(post => post.id === selectedPostId);
  const noPostsYet =
    selectedUserId &&
    !isPostsLoading &&
    hasLoaded &&
    !postsLoadingError &&
    posts.length === 0;
  const showPosts =
    selectedUserId && !isPostsLoading && !postsLoadingError && posts.length > 0;

  useEffect(() => {
    const loadUsers = async () => {
      setIsUserLoading(true);
      try {
        const data = await client.get<User[]>('/users');

        setUsers(data);
        setUsersLoadingError(false);
      } catch (error) {
        setUsersLoadingError(true);
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setIsPostsLoading(true);

      if (selectedUserId === null) {
        setIsPostsLoading(false);
        setPosts([]);

        return;
      }

      try {
        const list = await client.get<Post[]>(
          `/posts?userId=${selectedUserId}`,
        );

        setPosts(list);
        setPostsLoadingError(false);
      } catch {
        setPostsLoadingError(true);
      } finally {
        setIsPostsLoading(false);
        setHasLoaded(true);
      }
    };

    loadPosts();
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
                  selectedUserId={selectedUserId}
                  onSelect={userId => {
                    setSelectedUserId(userId);
                    setSelectedPostId(null);
                  }}
                  isLoading={isUserLoading}
                  hasError={usersLoadingError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {noPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPosts && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelect={setSelectedPostId}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
