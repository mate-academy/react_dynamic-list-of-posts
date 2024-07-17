import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';
import { getPosts, removeComments } from './utils/fetchClient';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCommentField, setShowCommentField] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentsFromPost, setCommentsFromPost] = useState<Comment[]>([]);

  useEffect(() => {
    setPostsLoading(true);
    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => {
          setErrorNotification('Something went wrong');
          setError(true);
        })
        .finally(() => {
          setPostsLoading(false);
        });
    }
  }, [selectedUser, setError]);

  const onDeleteComment = useCallback(async (commentId: number) => {
    setCommentsFromPost(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    await removeComments(commentId);
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setPosts={setPosts}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsLoading && selectedUser && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorNotification}
                  </div>
                )}

                {posts.length === 0 && !postsLoading && !errorNotification && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && selectedUser && !postsLoading && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                    setErrorNotification={setErrorNotification}
                    setShowCommentField={setShowCommentField}
                    setCommentLoading={setCommentLoading}
                    setCommentsFromPost={setCommentsFromPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedUser && selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  setErrorNotification={setErrorNotification}
                  onDeleteComment={onDeleteComment}
                  commentsFromPost={commentsFromPost}
                  setCommentsFromPost={setCommentsFromPost}
                  selectedPost={selectedPost}
                  errorNotification={errorNotification}
                  setShowCommentField={setShowCommentField}
                  showCommentField={showCommentField}
                  commentLoading={commentLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
