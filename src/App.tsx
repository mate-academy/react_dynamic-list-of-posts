import { useState, useEffect } from 'react';
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
import { getUsers, getUserPosts } from './utils/api';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);

  // Завантажуємо юзерів при першому рендері
  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        // Тут можна обробити помилку завантаження юзерів, якщо потрібно
      });
  }, []);

  // Завантажуємо пости, коли змінюється обраний юзер
  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);

      return;
    }

    setIsLoadingPosts(true);
    setHasPostsError(false);
    setSelectedPost(null); // Закриваємо сайдбар при зміні юзера

    getUserPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setHasPostsError(true))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUser]);

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
                  onSelectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !isLoadingPosts &&
                  !hasPostsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {posts.length > 0 && !isLoadingPosts && !hasPostsError && (
                  <>
                    <h2 className="title is-3">Posts:</h2>
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelectPost={setSelectedPost}
                    />
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  onClose={() => setSelectedPost(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
