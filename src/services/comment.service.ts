import React from 'react';
import { UseFormResetField } from 'react-hook-form';
import { Action, ActionTypes } from '../reducer/store';
import { addComment, deleteComment } from '../api/users.api';
import { Comment, CommentData } from '../types/Comment';

export function commentService(
  dispatch: (action: Action) => void,
  commentsList: Comment[] | null,
) {
  function addNewComment(
    dataToSend: CommentData & { postId: number },
    setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>,
    resetField: UseFormResetField<CommentData>,
  ) {
    addComment(dataToSend)
      .then((res) => {
        dispatch({
          type: ActionTypes.getComments,
          comments: commentsList ? [...commentsList, res] : [res],
        });

        resetField('body');
      })
      .finally(() => {
        setShowSpinner(false);
      });
  }

  function removeComment(id: number) {
    const setComments = commentsList
      ? commentsList.filter(c => c.id !== id)
      : null;

    dispatch({
      type: ActionTypes.getComments,
      comments: setComments?.length ? setComments : null,
    });

    deleteComment(id)
      .catch(() => {
        throw Error();
      });
  }

  return { addNewComment, removeComment };
}
