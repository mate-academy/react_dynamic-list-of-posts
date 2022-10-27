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
import { NotificationMassege } from './types/NotificationMassege';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationMassege>(
    NotificationMassege.NONE,
  );

  const getPosts = async (userId: number) => {
    try {
      setLoading(true);
      const posts = await getUserPosts(userId);

      if (!posts.length) {
        setNotification(NotificationMassege.NO_POSTS);
      }

      setUserPosts(posts);
    } catch {
      setNotification(NotificationMassege.GET_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      setUserPosts([]);
      setPost(null);
      setNotification(NotificationMassege.NONE);
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

                {notification === NotificationMassege.GET_POSTS && (
                  <Notification
                    type={NotificationType.danger}
                    massege={notification}
                    dataCy="PostsLoadingError"
                  />
                )}

                {notification === NotificationMassege.NO_POSTS && (
                  <Notification
                    type={NotificationType.warning}
                    massege={notification}
                    dataCy="NoPostsYet"
                  />
                )}

                {!userPosts.length || (
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
