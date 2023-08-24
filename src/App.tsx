import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { MemoSidebar } from './components/Sidebar';
import { PostsList } from './components/PostsList';
import { MemoUserSelector } from './components/UserSelector';
import { NotificationMessage } from './components/NotificationMessage';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';

import { User } from './types/User';
import { Post } from './types/Post';
import { Notification } from './types/Notification';

if (!process.env.REACT_APP_URL_USERS) {
  throw new Error('Users Key in not defined');
}

if (!process.env.REACT_APP_POSTS_BY_USER) {
  throw new Error('User posts in not defined');
}

const URL_GET_USERS = process.env.REACT_APP_URL_USERS;
const URL_GET_POSTS = process.env.REACT_APP_POSTS_BY_USER;

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);
  const [notificationData, setNotificationData]
    = useState<Notification | null>(null);

  // #region Load-users

  useEffect(() => {
    client.get<User[]>(URL_GET_USERS)
      .then(receivedUsers => {
        const trimmedUsers = receivedUsers.slice(0, 25);

        setUsers(trimmedUsers);
      })
      .catch(() => {
        throw new Error('Something wrong');
      });
  }, []);

  // #endregion

  // #region Select-user
  const onUserSelect = useCallback((userSelected: User) => {
    setSelectedUser(userSelected);
    setSelectedPost(null);
  }, []);
  // #endregion

  // #region Load-posts

  const handlerLoadedPosts = (receivedPosts: Post[], hasError = false) => {
    if (hasError) {
      const errorMessageData: Notification = {
        typeNotification: 'danger',
        text: 'Error loading posts',
        dataCypress: 'PostsLoadingError',
      };

      setIsError(true);
      setNotificationData(errorMessageData);

      return;
    }

    if (receivedPosts.length === 0 && !hasError) {
      const errorMessageData: Notification = {
        typeNotification: 'warning',
        text: 'No posts yet',
        dataCypress: 'NoPostsYet',
      };

      setIsError(true);
      setNotificationData(errorMessageData);

      return;
    }

    setIsError(false);
    setPosts(receivedPosts);
  };

  useEffect(() => {
    if (selectedUser) {
      setIsError(false);
      setIsLoading(true);
      client.get<Post[]>(URL_GET_POSTS + selectedUser.id)
        .then((downloadedPosts) => {
          handlerLoadedPosts(downloadedPosts, false);
        })
        .catch(() => handlerLoadedPosts(posts, true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  // #endregion

  // #region Select-post
  const onSelectPost = (post: Post) => {
    if (selectedPost) {
      if (selectedPost.id === post.id) {
        setSelectedPost(null);

        return;
      }
    }

    setSelectedPost(post);
  };

  // #endregion

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <MemoUserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onUserSelect={onUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isLoading && (
                  <Loader />
                )}

                {isError && notificationData && (
                  <NotificationMessage
                    data={notificationData}
                  />
                )}

                {posts.length > 0 && !isError && !isLoading && (
                  <PostsList
                    posts={posts}
                    onSelectPost={onSelectPost}
                  />
                )}

              </div>
            </div>
          </div>

          <MemoSidebar
            selectedPost={selectedPost}
          />
        </div>
      </div>
    </main>
  );
};
