import React from 'react';
import Comment from './Comment/Comment';

type Props = {
  userComments?: Comment[];
};

const CommentList: React.FC<Props> = ({ userComments }) => (
  <>
    {userComments?.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
      />
    ))}
  </>
);

export default CommentList;
