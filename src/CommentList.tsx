import React from 'react';
import { CommentListItem } from './CommentListItem';

type Props = {
  comments: Comment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ul className="comment-list">
      {(
        comments.map(item => (
          <CommentListItem
            key={item.id}
            name={item.name}
            body={item.body}
            email={item.email}
          />
        ))
      )}
    </ul>
  );
};
