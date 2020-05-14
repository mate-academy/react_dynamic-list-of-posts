import React from 'react';
import Comment from './Comment';

type Props = {
  comments: CommentProps[];
};

const CommentList: React.FC<Props> = ({ comments }) => (
  <article className="comments">
    Comments:&nbsp;
    {comments.map((comment: CommentProps) => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </article>
);

export default CommentList;
