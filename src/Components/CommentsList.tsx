import React from 'react';
import Comment from './Comment';

type Props = {
  comments: Comment[];
};

const CommentsList: React.FunctionComponent<Props> = ({ comments }) => {
  return (
    <section className="post__comments-section">
      <h3 className="post__comments-title">Comments:</h3>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </section>
  );
};

export default CommentsList;
