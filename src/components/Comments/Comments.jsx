import React from 'react';
import PropTypes from 'prop-types';
import { CommentShape } from '../shapes/CommentShape';

export const Comments = ({ comments, handleDelete }) => (
  <ul className="PostDetails__list">
    {
      comments.map(comment => (
        <li key={comment.id} className="PostDetails__list-item">
          <button
            type="button"
            className="PostDetails__remove-button button"
            onClick={() => handleDelete(comment)}
          >
            <i className="fas fa-trash-alt" />
          </button>
          <div className="PostDetails__comment-wrapper">
            <h6 className="PostDetails__list-item-user">
              <b>{comment.name}</b>
            </h6>
            <p>{comment.body}</p>
          </div>
        </li>
      ))
    }
  </ul>
);

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(CommentShape)).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
