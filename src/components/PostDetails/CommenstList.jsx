import React from 'react';
import PropTypes, { object } from 'prop-types';

import { Comment } from './Comment';

export const CommentsList = ({ postComments }) => (
  <ul className="PostDetails__list">
    {postComments.map(comment => (
      <li
        key={comment.id}
        className="PostDetails__list-item"
      >
        <Comment comment={comment} />
      </li>
    ))}

  </ul>
);

CommentsList.propTypes = {
  postComments: PropTypes.arrayOf(object).isRequired,
};
