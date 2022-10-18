import React, { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';
import { Loader } from './Loader';

interface Props {
  comment: Comment,
}

export const CommentElement: FC<Props> = ({ comment }) => {
  const {
    name,
    email,
    body,
    id,
    postId,
  } = comment;
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation(
    ['deleteComment', id],
    deleteComment,
    {
      onMutate: async (commentId: number) => {
        await queryClient.cancelQueries(['comments', postId]);

        const previousComments = queryClient
          .getQueryData<Comment[]>(['comments', postId]);

        if (previousComments) {
          queryClient.setQueryData<Comment[]>(
            ['comments', postId],
            (prevComments) => {
              if (prevComments) {
                return [...prevComments
                  .filter((oneComment) => oneComment.id !== commentId)];
              }

              return prevComments;
            },
          );
        }

        return { previousComments };
      },
      onError: (_error, _commentId, context) => {
        if (context && context.previousComments) {
          queryClient
            .setQueryData<Comment[]>(
            ['comments', postId],
            context.previousComments,
          );
        }
      },
      onSettled: () => queryClient.invalidateQueries(['comments', postId]),
    },
  );

  const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteCommentMutation.mutate(id);
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className={classNames(
            'delete',
            'is-small',
          )}
          aria-label="delete"
          onClick={handleDeleteButton}
        >
          delete button
        </button>
      </div>

      {deleteCommentMutation.isLoading ? (
        <Loader />
      ) : (
        <div className="message-body" data-cy="CommentBody">
          {body}
        </div>
      )}
    </article>
  );
};
