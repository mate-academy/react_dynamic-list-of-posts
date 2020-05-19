import React from 'react';
import { Comment } from './Comment';

type Props = {
  comments: CommentType[];
};

export const CommentList: React.FC<Props> = ({ comments }) => (
  <>
    <ul className="comments">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </ul>
  </>
);
