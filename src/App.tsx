import { useEffect, useState } from 'react';

import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUsers, getUsersPosts } from './api/api';

import { User } from './types/User';
import { Post } from './types/Post';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setIsLoading(false);

      return;
    }

    setHasPostsError(false);
    setIsLoading(true);

    getUsersPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setHasPostsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedUser]);

  const shouldShowNoPosts =
    !isLoading && !hasPostsError && selectedUser !== null && posts.length === 0;

  const shouldShowPosts =
    !isLoading && !hasPostsError && selectedUser !== null && posts.length > 0;

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
                  onSelect={user => {
                    setSelectedUser(user);
                    setSelectedPost(null);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {!isLoading && hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPosts && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelect={setSelectedPost}
                    onClosePost={() => setSelectedPost(null)}
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
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails postInfo={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
