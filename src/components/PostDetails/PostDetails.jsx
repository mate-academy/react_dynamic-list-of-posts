import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteComment, addComment } from '../../api/comments';

export const PostDetails = ({ id, body }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    getPostComments(+id).then(res => setComments(res));
  }, [id]);

  const handleCommentsDisplay = () => {
    setShowComments(!showComments);
  };

  const handleCommentAddition = (postId, inputName, email, comment) => {
    addComment(postId, inputName, email, comment)
      .then(() => {
        getPostComments(+id).then(res => setComments(res));
      });
  };

  const handleCommentDeletion = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        getPostComments(+id).then(res => setComments(res));
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{body}</p>
      </section>

      {comments.length > 0 && (
        <section className="PostDetails__comments">
          {showComments && (
            <button
              onClick={handleCommentsDisplay}
              type="button"
              className="button"
            >
              {`Show ${comments.length} comments`}
            </button>
          )}

          {!showComments && (
            <button
              onClick={handleCommentsDisplay}
              type="button"
              className="button"
            >
              {`Hide ${comments.length} comments`}
            </button>
          )}

          {!showComments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li
                  key={comment.body}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      handleCommentDeletion(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                  <p>{comment.id}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={id}
            onCommentAddition={handleCommentAddition}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
};
