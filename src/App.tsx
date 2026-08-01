import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUsers } from './api/api';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Post } from './types/Post';
import { User } from './types/User';
import { getUserPosts } from './api/api';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleUserSelect = (user: User) => {
    if (selectedUser?.id === user.id) {
      return;
    }

    setSelectedUser(user);
    setSelectedPost(null);
    setPosts([]);
    setHasPostsError(false);
    setIsPostsLoading(true);

    getUserPosts(user.id)
      .then(setPosts)
      .catch(() => {
        setHasPostsError(true);
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  };

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post);
  };

  let mainContent: React.ReactNode = null;

  if (!selectedUser) {
    mainContent = <p data-cy="NoSelectedUser">No user selected</p>;
  } else if (isPostsLoading) {
    mainContent = <Loader />;
  } else if (hasPostsError) {
    mainContent = (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  } else if (posts.length === 0) {
    mainContent = (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  } else {
    mainContent = (
      <PostsList
        posts={posts}
        selectedPost={selectedPost}
        onSelect={handlePostSelect}
      />
    );
  }

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
                {mainContent}
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
                <PostDetails key={selectedPost.id} post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
