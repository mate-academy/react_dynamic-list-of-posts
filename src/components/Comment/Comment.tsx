import React from 'react';
import './Comment.css';

type Props = {
  name: string;
  email: string;
  body: string;
};

const Comment: React.FC<Props> = ({ name, email, body }) => {
  return (
    <>
      <div className="comment">
        <div className="comment__name comment__indentation">
          <strong>Comment by:</strong> { name }<br />
        </div>
        <div className="comment__email comment__indentation">
          <strong>Email:</strong>
          <a
            href={`mailto:${email}`}
            className="comment__email-link comment__indentation"
          >
            {email}
          </a>
        </div>
      </div>
      <div className="comment__text comment__indentation">
        {body}
      </div>
    </>
  );
};

export default Comment;
