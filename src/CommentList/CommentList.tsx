import React, { FC } from 'react';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => (
  <div>
    {comments.map(comment => (
      <div className="comment" key={comment.id}>
        <span className="comment__name">
          {comment.name}
        </span>
        <p className="comment__body">
          {comment.body}
        </p>
      </div>
    ))}
  </div>
);
