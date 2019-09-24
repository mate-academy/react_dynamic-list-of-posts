import React from 'react';
import './Comment.scss';
import { CommentProps } from '../../constants/proptypes';

import User from '../User/User';

const Comment = ({ key, comment }) => {
  const { name, body, email } = comment;

  return (
    <div className="comment">
      <div>
        <p className="comment__text comment__name">{name}</p>
        <p className="comment__text comment__body">{body}</p>
      </div>
      <div className="comment__author">
        <User user={{ email }} />
      </div>
    </div>
  );
};

Comment.propTypes = CommentProps;

export default Comment;
