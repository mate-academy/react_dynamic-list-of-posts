import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { Notification } from './components/Notification';
import { NotificationType } from './types/NotificationType';
import { NotificationMessage } from './types/NotificationMessage';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationMessage>(
    NotificationMessage.NONE,
  );

  const getPosts = async (userId: number) => {
    try {
      setLoading(true);
      const posts = await getUserPosts(userId);

      if (!posts.length) {
        setNotification(NotificationMessage.NO_POSTS);
      }

      setUserPosts(posts);
    } catch {
      setNotification(NotificationMessage.GET_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      setUserPosts([]);
      setPost(null);
      setNotification(NotificationMessage.NONE);
      getPosts(selectedUserId);
    }
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                  onError={setNotification}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && <Loader />}

                {notification === NotificationMessage.GET_POSTS && (
                  <Notification
                    type={NotificationType.danger}
                    massege={notification}
                    dataCy="PostsLoadingError"
                  />
                )}

                {notification === NotificationMessage.NO_POSTS && (
                  <Notification
                    type={NotificationType.warning}
                    massege={notification}
                    dataCy="NoPostsYet"
                  />
                )}

                {userPosts.length > 0 && (
                  <PostsList
                    posts={userPosts}
                    currentPost={post}
                    setPost={setPost}
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
              { 'Sidebar--open': post },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails
                  post={post}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
