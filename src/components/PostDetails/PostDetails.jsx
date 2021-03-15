import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = (
  { postDetails, comments, deleteComment, onAdd, postId },
) => {
  const [isVisible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={toggleVisible}
          >
            {`${isVisible ? 'Hide' : 'Show'} ${comments.length} comments`}
          </button>
        )}
        {isVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
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
          <NewCommentForm onAdd={onAdd} postId={postId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteComment: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
