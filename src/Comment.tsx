import React from 'react';

type Props = {
  comment: CommentProps;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <>
      <div className="comment">
        <p className="author">
          Сomment author:&nbsp;
          {name}
        </p>
        <p>{body}</p>
        <p className="email">
          Email:&nbsp;
          {email}
        </p>
      </div>
    </>
  );
};

export default Comment;
