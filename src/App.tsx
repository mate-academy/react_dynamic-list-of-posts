import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import React, { useEffect } from 'react';
import { User } from './types/User';
import { getPostsOfUser, getUsers } from './utils/api';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [usersFromServer, setUsersFromServer] = React.useState<User[]>();
  const [postsFromServer, setPostsFromServer] = React.useState<Post[]>();

  const [chosenUser, setChosenUser] = React.useState<User | null>(null);
  const [postError, setPostError] = React.useState(false);
  const [isPostsLoading, setIsPostsLoading] = React.useState(false);
  const [activePost, setActivePost] = React.useState<Post | null>(null);

  // Стан для помилок під час завантаження користувачів
  const [userErrors, setUserErrors] = React.useState(false);

  // Завантажуємо користувачів
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUsers = await getUsers();

        setUsersFromServer(currentUsers);
      } catch (err) {
        setUserErrors(true);
      }
    };

    fetchUsers();
  }, []);

  // Завантажуємо пости обраного користувача
  useEffect(() => {
    const fetchPosts = async () => {
      setIsPostsLoading(true);
      try {
        const currentPosts = await getPostsOfUser(chosenUser?.id ?? 0);

        setPostsFromServer(currentPosts);
      } catch (err) {
        setPostError(true);
      } finally {
        setIsPostsLoading(false);
      }
    };

    if (chosenUser) {
      setActivePost(null);
      fetchPosts();
    }
  }, [chosenUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {/*
                  Передаємо у UserSelector порожній масив
                  замість null, щоб уникнути помилок .map()
                */}
                <UserSelector
                  users={usersFromServer ?? []}
                  chosenUser={chosenUser}
                  chooseUser={setChosenUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {/* Якщо помилка при завантаженні користувачів */}
                {userErrors && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    Failed to load users. Please try again later.
                  </div>
                )}

                {/* Якщо нема обраного користувача */}
                {!userErrors && !chosenUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : isPostsLoading ? (
                  <Loader />
                ) : postError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : postsFromServer?.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={postsFromServer}
                    activePost={activePost}
                    choosePost={setActivePost}
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
              { 'Sidebar--open': activePost },
            )}
          >
            {activePost && (
              <div className="tile is-child box is-success">
                <PostDetails post={activePost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
