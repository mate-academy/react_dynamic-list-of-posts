import { useEffect, useReducer, useState } from 'react';
import { appReducer } from './reducer/appReducer';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getComments, removeComment } from './api/fetchComments';
import { getPosts } from './api/fetchPosts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';
import { initialState } from './reducer/initialState';

export const App = () => {
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [state, dispatch] = useReducer(appReducer, initialState);

  const {
    selectedUserId,
    posts,
    selectedPostId,
    postsNotification,
    comments,
    commentsNotification,
  } = state;

  const selectedPost = posts.find(post => post.id === selectedPostId);

  const handleSelectUser = (userId: number) => {
    dispatch({ type: 'SELECT_USER', userId });
  };

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    setIsPostsLoading(true);

    getPosts(selectedUserId)
      .then(fetchedPosts => {
        dispatch({
          type: 'SET_POSTS_SUCCESS',
          posts: fetchedPosts,
        });
      })
      .catch(() => {
        dispatch({ type: 'SET_POSTS_ERROR' });
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUserId]);

  useEffect(() => {
    if (!selectedPostId) {
      dispatch({
        type: 'SET_COMMENTS_SUCCESS',
        comments: [],
      });

      setIsCommentsLoading(false);

      return;
    }

    setIsCommentsLoading(true);

    getComments(selectedPostId)
      .then(fetchedComments => {
        dispatch({
          type: 'SET_COMMENTS_SUCCESS',
          comments: fetchedComments,
        });
      })
      .catch(() => {
        dispatch({ type: 'SET_COMMENTS_ERROR' });
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [selectedPostId]);

  const addNewComment = (newComment: Comment) => {
    dispatch({ type: 'ADD_COMMENT', comment: newComment });
  };

  const deleteComment = (commentId: number) => {
    const commentToDelete = comments.find(c => c.id === commentId);

    if (!commentToDelete) {
      return;
    }

    dispatch({ type: 'DELETE_COMMENT', commentId });

    removeComment(commentId).catch(() => {
      dispatch({ type: 'ADD_COMMENT', comment: commentToDelete });
      dispatch({ type: 'SET_COMMENTS_ERROR' });
    });
  };

  const showComments = (postId: number) => {
    dispatch({
      type: 'SET_SELECTED_POST',
      postId: selectedPostId === postId ? null : postId,
    });
  };

  const closeComments = () => {
    dispatch({
      type: 'SET_SELECTED_POST',
      postId: null,
    });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUserId={selectedUserId}
                  onSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {postsNotification?.type === 'error' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsNotification?.message}
                  </div>
                )}

                {postsNotification?.type === 'warning' && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    {postsNotification?.message}
                  </div>
                )}

                {selectedUserId && posts.length > 0 && !isPostsLoading && (
                  <PostsList
                    posts={posts}
                    showComments={showComments}
                    selectedPostId={selectedPostId}
                    closeComments={closeComments}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            {selectedPostId && selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  post={selectedPost}
                  addNewComment={addNewComment}
                  deleteComment={deleteComment}
                  notification={commentsNotification}
                  loading={isCommentsLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
