import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';
import { commentShape } from '../types/propShapes';

interface CommentsListProps {
  comments: Comment[];
  onDeleteComment: (comment: Comment) => void;
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  onDeleteComment,
}) => {
  return (
    <div className="CommentsList">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(commentShape.isRequired).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};
