import React from 'react';
import { Comment } from '../../../../types/Comment';
import { CommentItem } from './components/CommentsItem';
import { ErrorText } from '../../../../types/ErrorText';

type Props = { comments: Comment[]; onError: (v: ErrorText) => void };

export const CommentsList: React.FC<Props> = React.memo(
  ({ comments, onError }) => (
    <div>
      <p className="title is-4">Comments:</p>
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} onError={onError} />
      ))}
    </div>
  ),
);

CommentsList.displayName = 'CommentsList';
