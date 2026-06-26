import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { getUserPosts } from './api/userPosts';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch {
        setHasError(true);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setPosts([]);
    setSelectedPost(null);
    setHasError(false);
    setIsLoading(true);

    const loadPosts = async () => {
      try {
        const data = await getUserPosts(selectedUser.id);

        setPosts(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handlePostSelect = (post: Post) => {
    setSelectedPost(current => (current?.id === post.id ? null : post));
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
                  selectedUser={selectedUser}
                  onSelected={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && (
                  <>
                    {isLoading && <Loader />}

                    {!isLoading && hasError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!isLoading && !hasError && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!isLoading && !hasError && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        onPostSelect={handlePostSelect}
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
              { 'Sidebar--open': !!selectedPost },
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
