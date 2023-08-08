import React from 'react';
import { Action, ActionTypes, NotificationTypes } from '../reducer/store';
import { getPostComments, getUserPost } from '../api/users.api';
import { User } from '../types/User';
import { Post } from '../types/Post';

export function postService(
  dispatch: (action: Action) => void,
) {
  function setPosts(
    setShowNotification: React.Dispatch<React.SetStateAction<boolean>>,
    selectedUser: User | null,
    setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    setShowNotification(false);

    dispatch(
      { type: ActionTypes.selectPost, post: null },
    );

    if (selectedUser) {
      setShowSpinner(true);

      dispatch(
        { type: ActionTypes.getAllPosts, posts: null },
      );

      getUserPost(selectedUser.id)
        .then(posts => {
          if (!Array.isArray(posts)) {
            throw Error();
          }

          if (posts.length === 0) {
            setShowNotification(true);

            dispatch({
              type: ActionTypes.setNotification,
              notificationType: NotificationTypes.warning,
              notificationMessage: 'No posts yet',
              notificationData: 'NoPostsYet',
            });

            dispatch(
              { type: ActionTypes.getAllPosts, posts: null },
            );

            return;
          }

          dispatch(
            { type: ActionTypes.getAllPosts, posts },
          );
        })
        .catch(() => {
          dispatch(
            { type: ActionTypes.getAllPosts, posts: null },
          );

          dispatch({
            type: ActionTypes.setNotification,
            notificationType: NotificationTypes.danger,
            notificationMessage: 'Something went wrong!',
            notificationData: 'PostsLoadingError',
          });

          setShowNotification(true);
        })
        .finally(() => {
          setShowSpinner(false);
        });
    }
  }

  function setPostComments(
    selectedPost: Post | null,
    setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>,
    setShowNotification: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    if (selectedPost) {
      setShowSpinner(true);

      getPostComments(selectedPost.id)
        .then(comments => {
          if (!Array.isArray(comments)) {
            throw Error();
          }

          if (comments.length) {
            dispatch({ type: ActionTypes.getComments, comments });
          } else {
            dispatch({ type: ActionTypes.getComments, comments: null });
          }
        })
        .catch(() => {
          setShowNotification(true);

          dispatch({
            type: ActionTypes.setNotification,
            notificationType: NotificationTypes.danger,
            notificationMessage: 'Something went wrong!',
            notificationData: 'CommentsError',
          });
        })
        .finally(() => {
          setShowSpinner(false);
        });
    }
  }

  return { setPosts, setPostComments };
}
