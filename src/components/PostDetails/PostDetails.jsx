import React, { useState, useEffect, useCallback } from 'react';
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

  const handleRemoveComment = (commentId) => {
    removeCommentFromServer(commentId);

    setComments(previousComments => (
      previousComments.filter(({ id }) => id !== commentId)
    ));
  };

  const addNewComment = useCallback((comment) => {
    addCommentToServer(comment);

    setComments(previousComments => [
      ...previousComments,
      comment,
    ]);
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body || 'No description'}</p>
      </section>

      <section className="PostDetails__comments">
        {isVisibleComment ? (
          <button
            type="button"
            className="button"
            onClick={() => setVisibleComment(false)}
          >
            Hide
            {' '}
            {comments ? comments.length : ''}
            {' '}
            comments
          </button>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => setVisibleComment(true)}
          >
            Show comments
          </button>
        )}

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
