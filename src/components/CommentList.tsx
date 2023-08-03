import React from 'react';
// eslint-disable-next-line import/extensions
import { IComment } from '../models/IComment';
import CommentListItem from './CommentListItem';

type CommentListProps = {
  comments: IComment[],
};

const CommentList:React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  }

  return (
    <>
      <p className="title is-4">Comments:</p>

      {
        comments.map(comment => (
          <CommentListItem comment={comment} key={comment.id} />
        ))
      }
    </>
  );
};

export default CommentList;
