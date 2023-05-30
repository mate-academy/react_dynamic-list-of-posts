import React, { useMemo, useState } from 'react';
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

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [error, setError] = useState(Error.None);
  const [loading, setLoading] = useState(Loading.None);

  const isPosts = useMemo(
    () => !posts.length && !!currentUserId && !loading && !error,
    [posts, currentUserId, loading],
  );

  const UserSelectorContextValue = useMemo(() => Object({
    error, currentUserId,
  }), [error, currentUserId]);

  const PostDetailsContextValue = useMemo(() => Object({
    post: currentPost,
    error,
    loading,
    comments,
    setLoading,
    setComments,
    setError,
  }), [currentPost, error, loading, comments]);

  return (
    <main className="section" aria-hidden="true">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelectorContext.Provider value={UserSelectorContextValue}>
                  <UserSelector
                    setError={setError}
                    setLoading={setLoading}
                    setPosts={setPosts}
                    setCurrentPost={setCurrentPost}
                    setCurrentUserId={setCurrentUserId}
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
                    setCurrentPost={setCurrentPost}
                    setLoading={setLoading}
                    setComments={setComments}
                    setError={setError}
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
                <PostDetailsContext.Provider value={PostDetailsContextValue}>
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
