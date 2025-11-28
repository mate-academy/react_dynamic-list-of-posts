import { useState, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasPostsErrors, setHasPostsErrors] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await client.get<User[]>('/users');

        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          setUsers([]);
        }
      } catch (error) {
        setUsers([]);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setPosts([]);
      setSelectedPostId(null);

      return;
    }

    const loadPosts = async () => {
      setIsLoadingPosts(true);
      setHasPostsErrors(false);
      setSelectedPostId(null);

      try {
        const postsData = await client.get<Post[]>(
          `/posts?userId=${selectedUserId}`,
        );

        if (Array.isArray(postsData)) {
          setPosts(postsData);
        } else {
          setPosts([]);
        }
      } catch (error) {
        setHasPostsErrors(true);
        setPosts([]);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, [selectedUserId]);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(prevUserId => (prevUserId === userId ? null : userId));
  };

  const handlePostSelect = (postId: number) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);

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
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUserId && isLoadingPosts && <Loader />}

                {selectedUserId && hasPostsErrors && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUserId &&
                  !isLoadingPosts &&
                  !hasPostsErrors &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUserId &&
                  !isLoadingPosts &&
                  !hasPostsErrors &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPostId}
                      onPostSelect={handlePostSelect}
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
                'Sidebar--open': !!selectedPost,
              },
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
