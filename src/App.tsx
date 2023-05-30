import React, { useCallback, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import {
  Loader,
  PostsList,
  PostDetails,
  UserSelector,
  Notification,
} from './components';

import {
  Post,
  Notif,
  Error,
  Loading,
  Comment,
} from './types';
import { UserSelectorContext, PostDetailsContext } from './context';
import { getCommentsFromServer, getPostsFromServer } from './api';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [error, setError] = useState(Error.None);
  const [loading, setLoading] = useState(Loading.None);

  const getPosts = async (userId: number) => {
    setLoading(Loading.Posts);
    setError(Error.None);
    setCurrentPost(null);

    try {
      const data = await getPostsFromServer(userId);

      setPosts(data);
    } catch {
      setError(Error.GetPosts);
    } finally {
      setLoading(Loading.None);
    }
  };

  const getComments = useCallback(async (post: Post) => {
    if (currentPost?.id === post.id) {
      setCurrentPost(null);

      return;
    }

    setLoading(Loading.Comments);
    setCurrentPost(post);

    try {
      const data = await getCommentsFromServer(post.id);

      setComments(data);
    } catch {
      setError(Error.GetComments);
    } finally {
      setLoading(Loading.None);
    }
  }, [error, loading, currentPost, comments]);

  const handleUserSelect = useCallback((userId: number) => {
    setCurrentUserId(userId);
    getPosts(userId);
  }, [currentUserId]);

  const userSelectorContextValue = useMemo(() => Object({
    error, currentUserId,
  }), [error, currentUserId]);

  const postDetailsContextValue = useMemo(() => Object({
    post: currentPost,
    error,
    loading,
    comments,
    setLoading,
    setComments,
    setError,
  }), [currentPost, error, loading, comments]);

  const isPosts = useMemo(
    () => !posts.length && !!currentUserId && !loading && !error,
    [posts, currentUserId, loading],
  );

  return (
    <main className="section" aria-hidden="true">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelectorContext.Provider value={userSelectorContextValue}>
                  <UserSelector
                    currentUserId={currentUserId}
                    setError={setError}
                    handleUserSelect={handleUserSelect}
                  />
                </UserSelectorContext.Provider>
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUserId && error !== Error.GetUsers && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading === Loading.Posts && <Loader />}

                {error === Error.GetPosts && (
                  <Notification
                    type={Notif.Danger}
                    dataCy="PostsLoadingError"
                    text="Something went wrong!"
                  />
                )}

                {isPosts && (
                  <Notification dataCy="NoPostsYet" text="No posts yet" />
                )}

                {posts.length > 0 && loading !== Loading.Posts && (
                  <PostsList
                    currentPostId={currentPost?.id || 0}
                    posts={posts}
                    getComments={getComments}
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
              { 'Sidebar--open': !!currentPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {!!currentPost && (
                <PostDetailsContext.Provider value={postDetailsContextValue}>
                  <PostDetails />
                </PostDetailsContext.Provider>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
