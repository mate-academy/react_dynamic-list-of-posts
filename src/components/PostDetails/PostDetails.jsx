import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ id, body }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    getPostComments(id)
      .then(setComments);
  }, [id]);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentAdd = (postId, userName, userEmail, content) => {
    addComment(postId, userName, userEmail, content)
      .then(() => {
        getPostComments(id)
          .then(setComments);
      });
  };

  const handleCommentDelete = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        getPostComments(id)
          .then(setComments);
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
              type="button"
              className="button"
              onClick={handleShowComments}
            >
              {
                `Show
                ${comments.length}
                comments`
              }
            </button>
          )}

          {!showComments && (
            <button
              type="button"
              className="button"
              onClick={handleShowComments}
            >
              {
                `Hide
                ${comments.length}
                comments`
              }
            </button>
          )}
          {!showComments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.body}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      handleCommentDelete(comment.id);
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
          <NewCommentForm id={id} onAddComment={handleCommentAdd} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
};
