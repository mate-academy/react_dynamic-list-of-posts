import React from 'react';
import CommentItem from './CommentItem';
import { Comment } from './helper';

type Props = {
  comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      <ul>
        {comments.map(comment => (
          <li className="li__inside" key={comment.id}>
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>
    </>

  );
};

export default CommentList;
