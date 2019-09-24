import React from 'react';
import './Comment.css';
import User from '../User/User';
import { CommentPropTypes } from '../../constants/prototypes';

const Comment = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <div className="comment">
      <User name={name} email={email} />
      <p className="comment-text">
        {body}
      </p>
    </div>
  );
};

Comment.propTypes = CommentPropTypes;

export default Comment;
