import React from 'react';

import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';

export const PostDetails = ({
  post,
  comments,
  showComments,
  onShowComments,
  onDeleteComment,
  onAddComment,
}) => (

  <div className="PostDetails">
    <h2>Post details:</h2>

    <section className="PostDetails__post">
      <p>{post.body}</p>
    </section>

    <section className="PostDetails__comments">
      <button
        type="button"
        className="button"
        onClick={() => onShowComments()}
      >
        {`${showComments ? 'Hide' : 'Show'} ${comments.length} comments`}
      </button>

      {showComments && (
        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li
              key={comment.id}
              className="PostDetails__list-item"
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => onDeleteComment(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>

    <section>
      <div className="PostDetails__form-wrapper">
        <NewCommentForm onAddComment={onAddComment} />
      </div>
    </section>
  </div>
);

PostDetails.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  showComments: PropTypes.bool.isRequired,
  onShowComments: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
