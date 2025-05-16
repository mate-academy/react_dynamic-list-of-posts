import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await client.get<User[]>('/users');

        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      setPosts([]);
      setSelectedPostId(null);

      return;
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `/posts?userId=${selectedUserId}`;
        const fetchedPosts = await client.get<Post[]>(url);

        setPosts(fetchedPosts);

        const isSelectedPostStillAvailable =
          selectedPostId !== null &&
          fetchedPosts.some(post => post.id === selectedPostId);

        if (!isSelectedPostStillAvailable) {
          setSelectedPostId(null);
        }
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    // needs for mateacademy-ai-mentor  tests
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId]);

  const handleUserSelect = (userId: number | null) => {
    setSelectedUserId(userId);
  };

  const handlePostSelect = (postId: number) => {
    const shouldDeselectPost = postId === selectedPostId;

    setSelectedPostId(shouldDeselectPost ? null : postId);
  };

  const selectedPost = posts.find(post => post.id === selectedPostId) || null;
  const hasError = !!error;
  const isUserSelected = selectedUserId !== null;
  const hasNoPosts = !isLoading && posts.length === 0;
  const shouldShowPostsList =
    isUserSelected && !isLoading && !hasError && !hasNoPosts;

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
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isUserSelected && isLoading && <Loader />}

                {isUserSelected && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isUserSelected && !isLoading && !hasError && hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPostsList && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelectPost={handlePostSelect}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  onClose={() => setSelectedPostId(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
