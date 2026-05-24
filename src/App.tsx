import { useEffect, useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { getPosts } from './api/postService';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Post } from './types/Post';
import { User } from './types/User';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [arePostsLoading, setArePostsLoading] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    setSelectedPostId(null);

    if (!selectedUserId) {
      setPosts([]);
      setHasPostsError(false);

      return;
    }

    setArePostsLoading(true);
    setHasPostsError(false);

    getPosts(selectedUserId)
      .then(setPosts)
      .catch(() => {
        setPosts([]);
        setHasPostsError(true);
      })
      .finally(() => {
        setArePostsLoading(false);
      });
  }, [selectedUserId]);

  const selectedPost = posts.find(post => post.id === selectedPostId) || null;
  const hasNoPosts =
    Boolean(selectedUserId) &&
    !arePostsLoading &&
    !hasPostsError &&
    posts.length === 0;
  const shouldShowPosts =
    Boolean(selectedUserId) &&
    !arePostsLoading &&
    !hasPostsError &&
    posts.length > 0;

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
                  onSelect={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {arePostsLoading && <Loader />}

                {hasPostsError && (
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

                {shouldShowPosts && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelectPost={setSelectedPostId}
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
              {
                'Sidebar--open': Boolean(selectedPost),
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
