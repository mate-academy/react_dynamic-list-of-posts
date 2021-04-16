import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  getPostDetails,
  getComments,
  deleteComment,
  saveComment,
} from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState(null);
  const [isVisibleComment, setIsVisibleComment] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then(setPost);

    getComments(postId)
      .then(setComments);
  }, [postId]);

  const switchCommentHandler = () => {
    setIsVisibleComment(!isVisibleComment);
  };

  const deleteCommentHandler = (commentId) => {
    deleteComment(commentId);

    setComments(previous => previous
      .filter(comment => comment.id !== commentId));
  };

  const addNewComment = (data) => {
    saveComment({
      ...data,
      postId,
    })
      .then(newComment => setComments(previous => [...previous, newComment]));
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
          onClick={switchCommentHandler}
        >
          Hide &nbsp;
          {comments && comments.length}
          &nbsp; comments
        </button>
        <ul className="PostDetails__list">

          {isVisibleComment && comments && comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deleteCommentHandler(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm saveComment={addNewComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.defaultProps = {
  postId: null,
};

PostDetails.propTypes = {
  postId: PropTypes.number,
};
