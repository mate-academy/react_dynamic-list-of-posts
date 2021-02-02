import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import * as api from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [details, setDetails] = useState({});
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState({});

  useEffect(() => {
    getPostDetails(selectedPostId).then(setDetails);
    api.getPostComments(selectedPostId).then(setComments);
  }, [selectedPostId]);

  const deleteComment = (commentId) => {
    api.deletePostComment(commentId)
      .then(() => api.getPostComments(selectedPostId))
      .then(setComments);
  };

  const addComment = ({ name, email, body }) => {
    api.addPostComment({
      selectedPostId, name, email, body,
    })
      .then(() => api.getPostComments(selectedPostId))
      .then(setComments);
  };

  return (

    <div className="PostDetails">
      <h2>Post details:</h2>
      {selectedPostId && details ? (
        <>
          <section className="PostDetails__post">
            <p>
              User: #
              {details.userId}
            </p>
            <p>
              {details.title}
            </p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              {showComments
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`
              }
            </button>
            {showComments && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
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
              <NewCommentForm addComment={addComment} />
            </div>
          </section>
        </>
      ) : '<<<---Select post'}

    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
