import React from 'react';
import User from '../User/User';
import { CommentProps } from '../../constants/proptypes';

import './Comment.css';

const Comment = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <div className="content">
      <User name={name} email={email} />
      <div className="description">{body}</div>
    </div>
  );
};

Comment.propTypes = CommentProps;

export default Comment;
