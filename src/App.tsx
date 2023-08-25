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
import { Notification, NotificationType } from './types/Notification';

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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await client.get<User[]>(URL_GET_USERS);

        setUsers(usersList.slice(0, 25));
      } catch {
        throw new Error('Something wrong');
      }
    };

    getUsers();
  }, []);

  const onUserSelect = useCallback((userSelected: User) => {
    setSelectedUser(userSelected);
    setSelectedPost(null);
  }, []);

  const handlerLoadedPosts = (receivedPosts: Post[], hasError = false) => {
    if (hasError) {
      const errorMessageData: Notification = {
        typeNotification: NotificationType.danger,
        text: 'Error loading posts',
        dataCypress: 'PostsLoadingError',
      };

      setIsError(true);
      setNotificationData(errorMessageData);

      return;
    }

    if (!receivedPosts.length && !hasError) {
      const errorMessageData: Notification = {
        typeNotification: NotificationType.warning,
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
    const getPosts = async (userId: number) => {
      try {
        const receivedPosts
          = await client.get<Post[]>(URL_GET_POSTS + userId);

        handlerLoadedPosts(receivedPosts, false);
      } catch {
        handlerLoadedPosts(posts, true);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedUser) {
      setIsError(false);
      setIsLoading(true);

      getPosts(selectedUser.id);
    }
  }, [selectedUser]);

  const onSelectPost = (post: Post) => {
    if (selectedPost && selectedPost.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
  };

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
