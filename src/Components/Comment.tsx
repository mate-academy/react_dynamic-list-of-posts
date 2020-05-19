import React from 'react';

type Props = {
  comment: Comment;
};

const Comment: React.FunctionComponent<Props> = ({ comment }) => {
  return (
    <section className="post__comment">
      <p className="post__comment-body">{comment.body}</p>
      <div className="post__comment-author">
        <a href="/" className="post__comment-author-email">
          {comment.email}
        </a>
        <span className="post__comment-author-name">{comment.name}</span>
      </div>
    </section>
  );
};

export default Comment;
