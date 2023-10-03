import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector/UserSelector';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList/PostsList';
import { Notification } from './types/Notification';
import {
  NotificationMessage,
} from './components/NotificationMessage/NotificationMessage';
import { Loader } from './components/Loader';
import { Sidebar } from './components/Sidebar/Sidebar';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [
    notification,
    setNotification,
  ] = useState<Notification>(Notification.NoError);
  const [loadingError, setLoadingError] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post>();

  const showList = !isLoading && !loadingError
  && selectedUser && (notification !== Notification.NoPostsYet);

  const showNoPosts = !isLoading && !loadingError
  && selectedUser && (notification === Notification.NoPostsYet);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setNotification(Notification.NoError);

      client
        .get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then((data) => {
          if (data.length === 0) {
            setNotification(Notification.NoPostsYet);
          }

          setUserPosts(data);
        })
        .catch(() => {
          setLoadingError(true);
          setNotification(Notification.PostsLoadingError);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    setIsLoading(true);
    setSelectedPost(undefined);
  };

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post);
  };

  const handleClosedPost = () => {
    setSelectedPost(undefined);
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
                  onUserClick={handleSelectedUser}
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

                {!isLoading && loadingError && (

                  <NotificationMessage
                    notification={notification}
                    errorType="is-danger"
                    data="PostsLoadingError"
                  />
                )}

                {showNoPosts && (
                  <NotificationMessage
                    notification={notification}
                    errorType="is-warning"
                    data="NoPostsYet"
                  />
                )}

                {showList && (
                  <PostsList
                    posts={userPosts}
                    onPostOpen={handleSelectedPost}
                    onPostClose={handleClosedPost}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
            <Sidebar post={selectedPost} />
          )}
        </div>
      </div>
    </main>
  );
};
