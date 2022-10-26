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
import { ErrorMassege } from './types/ErrorMassege';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [noPosts, setNoPosts] = useState(false);
  const [error, setError] = useState<ErrorMassege>(ErrorMassege.NONE);
  const [loading, setLoading] = useState(false);
  const [newCommentForm, setNewCommentForm] = useState(false);

  // useEffect(() => {
  //   if (selectedUserId) {
  //     setUserPosts([]);
  //     setPost(null);
  //     setNoPosts(false);
  //     setError('');
  //     setLoading(true);

  //     getUserPosts(selectedUserId)
  //       .then((res) => {
  //         if (res.length === 0) {
  //           setNoPosts(true);
  //         } else {
  //           setUserPosts(res);
  //         }
  //       })
  //       .catch(() => setPostsError(true))
  //       .finally(() => setLoading(false));
  //   }
  // }, [selectedUserId]);

  const getPostList = async (userId: number) => {
    try {
      setUserPosts([]);
      setPost(null);
      setNoPosts(false);
      setError(ErrorMassege.NONE);
      setLoading(true);

      const postList = await getUserPosts(userId);

      if (!postList.length) {
        setNoPosts(true);
      }

      setUserPosts(postList);
    } catch {
      setError(ErrorMassege.GET_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      getPostList(selectedUserId);
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
                  onError={setError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && <Loader />}

                {error === ErrorMassege.GET_POSTS && (
                  <Notification
                    type={NotificationType.danger}
                    massege={ErrorMassege.GET_POSTS}
                    dataCy="PostsLoadingError"
                  />
                )}

                {noPosts && (
                  <Notification
                    type={NotificationType.warning}
                    massege={ErrorMassege.NO_POSTS}
                    dataCy="NoPostsYet"
                  />
                )}

                {!userPosts.length || (
                  <PostsList
                    posts={userPosts}
                    currentPost={post}
                    setPost={setPost}
                    setNewCommentForm={setNewCommentForm}
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
                  newCommentForm={newCommentForm}
                  setNewCommentForm={setNewCommentForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
