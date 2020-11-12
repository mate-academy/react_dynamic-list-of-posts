import React from 'react';
import PropTypes from 'prop-types';
import './CommentList.scss';

import closeButton from '../../images/close-btn.svg';

export const CommentList = ({ remove, comments }) => (
  <ul className="PostDetails__list">
    {comments.map(comment => (
      <li className="PostDetails__list-item">
        <img
          role="button"
          src={closeButton}
          className="PostDetails__remove-button"
          onClick={() => remove(comment.id)}
        >
        </img>
        <p>{comment.body}</p>
      </li>
    ))}
  </ul>
);

CommentList.propTypes = {
  remove: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};