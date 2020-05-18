import React from 'react';
import Comment from './Comment';
import { Comments } from './helper';

type Props = {
  comments: Comments[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      <ul>
        {comments.map(comment => (
          <li className="li__inside">
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </>

  );
};

export default CommentList;
