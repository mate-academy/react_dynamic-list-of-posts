import React from 'react';
import PropTypes from 'prop-types';
import './CommentList.scss';

export const CommentList = ({ remove, comments }) => (
  <ul className="PostDetails__list">
    {comments.map(comment => (
      <li className="PostDetails__list-item">
        <button
          type="button"
          className="PostDetails__remove-button button"
          onClick={() => remove(comment.id)}
        >
          X
        </button>
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
