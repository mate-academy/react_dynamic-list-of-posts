import React from 'react';
import { CommentsListItem } from './CommentsListItem';
import { Comment } from '../types/Comment';
import { HandleCommentDelete } from '../types/handlers';

type Props = {
  comments: Comment[];
  onCommentDelete: HandleCommentDelete;
};

export const CommentsList = React.memo(
  ({ comments, onCommentDelete }: Props) => (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentsListItem
          key={comment.id}
          comment={comment}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </>
  ),
);

CommentsList.displayName = 'CommentsList';
