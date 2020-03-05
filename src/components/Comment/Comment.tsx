import React, { FC } from 'react';
import { CommentInterface } from '../../constants/types';

interface Props {
  comment: CommentInterface;
}

export const Comment: FC<Props> = ({ comment }) => {
  return (
    <div className="card text-white bg-info mb-3">
      <h3 className="card-header">
        {comment.name}
      </h3>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>
            {comment.body}
          </p>
          <footer className="blockquote-footer">
            {comment.email}
          </footer>
        </blockquote>
      </div>
    </div>
  );
};
