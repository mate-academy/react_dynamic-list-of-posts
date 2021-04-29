import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import {
  getPostComments,
  removeCommentFromServer,
  addCommentToServer,
} from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState(null);
  const [isVisibleComment, setVisibleComment] = useState(true);

  useEffect(() => {
    getPostDetails(postId).then(setPost);
    getPostComments(postId).then(setComments);
  }, [postId]);

  const handleCloseButton = (clickEvent) => {
    const textButton = clickEvent.target.textContent;

    if (textButton !== 'Show comments') {
      setVisibleComment(false);
    } else {
      setVisibleComment(true);
    }
  };

  const handleRemoveComment = (commentId) => {
    removeCommentFromServer(commentId);

    setComments(previousComments => (
      previousComments.filter(({ id }) => id !== commentId)
    ));
  };

  const addNewComment = (comment) => {
    addCommentToServer(comment);

    setComments(previousComments => [
      ...previousComments,
      comment,
    ]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body || 'No description'}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleCloseButton}
        >
          {isVisibleComment ? (
            `Hide ${comments ? comments.length : ''} comments`
          ) : (
            'Show comments'
          )}
        </button>

        <ul className="PostDetails__list">
          {isVisibleComment && comments && comments.map(({ id, body }) => (
            <li className="PostDetails__list-item" key={id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => handleRemoveComment(id)}
              >
                X
              </button>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
