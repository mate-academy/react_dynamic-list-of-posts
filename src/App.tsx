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

import * as userService from './api/users';
import * as postService from './api/posts';
import classNames from 'classnames';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    setError(false);

    userService
      .getUsers()
      .then(setUsers)
      .catch(() => setError(true));
  }, []);

  const handleUserSelect = (userId: number) => {
    const user = users.find(u => u.id === userId);

    if (!user) {
      return;
    }

    setSelectedUser(user);
    setPosts([]);
    setSelectedPost(null);
    setError(false);

    setLoading(true);

    postService
      .getUserPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const handlePostSelect = (post: Post) => {
    if (selectedPost && selectedPost.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
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
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !error && (
                  <p data-cy="NoSelectedUser">No user selected</p>
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

                {posts.length === 0 && !loading && selectedUser && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelect={handlePostSelect}
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
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
