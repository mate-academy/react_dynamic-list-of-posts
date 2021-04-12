import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader/Loader';
import {
  getPostComments,
  deletePostComment,
  addPostComment,
} from '../../api/comments';

export const PostDetails = ({ userId, post }) => {
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getPostComments(userId)
      .then((coment) => {
        setComments(coment);
      });
  }, [userId]);

  const loadComments = useCallback((newComment) => {
    addPostComment({
      userId, ...newComment,
    })
      .then(() => getPostComments(userId))
      .then(setComments);
  }, [userId]);

  const deleteComment = (postId) => {
    deletePostComment(postId)
      .then(() => getPostComments(userId))
      .then(setComments);
  };

  return (
    <div className="PostDetails">
      {!post ? (
        <Loader />
      ) : (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button PostDetails__button"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {`Hide ${comments.length} comments`}
            </button>
            {visible && (
            <ul className="PostDetails__list">
              {comments && comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                    type="button"
                    className="PostDetails__remove-button button"
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
                loadComments={loadComments}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  userId: PropTypes.number.isRequired,
  post: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
