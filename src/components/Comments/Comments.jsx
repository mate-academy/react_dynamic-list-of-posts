import React from 'react';
import PropTypes from 'prop-types';
import { getPostComments, deleteComment } from '../../api/comments';

export const Comments = ({ comments, getComments, selectedPostId }) => (
  <ul className="PostDetails__list">
    {
      comments.map(comment => (
        <li
          key={comment.id}
          className="PostDetails__list-item"
        >
          <button
            type="button"
            className="PostDetails__remove-button button"
            onClick={async() => {
              await deleteComment(comment.id);
              getPostComments(selectedPostId)
                .then(getComments);
            }}
          >
            X
          </button>
          <p>{comment.body}</p>
        </li>
      ))
    }
  </ul>
);

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  getComments: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
