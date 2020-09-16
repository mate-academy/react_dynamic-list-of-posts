import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteComment } from '../../api/comments';

export const PostDetails = ({ title, selectedPostId }) => {
  const [postComments, setPostComments] = useState([]);
  const [showedComments, setShowedComments] = useState(true);

  const showComments = () => {
    getPostComments(selectedPostId)
      .then(setPostComments);
  };

  useEffect(() => {
    showComments();
    setShowedComments(true);
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setShowedComments(!showedComments)}
        >
          {`
          ${showedComments ? 'Hide ' : 'Show '}
          ${postComments.length} comments`}
        </button>

        {showedComments && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id)
                      .then(showComments);
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
          <NewCommentForm
            postId={selectedPostId}
            showComments={showComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  title: PropTypes.string.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
