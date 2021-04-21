import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  addComment,
  deleteComment,
  getPostComments,
  getPostDetails,
} from '../../api/services';
import { Loader } from '../Loader';

export const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [isUpdateComments, setUpdateComments] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    getPostDetails(postId)
      .then((response) => {
        setPostDetails(response.data);
        setIsLoad(false);
      });
  }, [postId]);

  useEffect(() => {
    getPostComments(postId)
      .then(response => setComments(response));
  }, [isUpdateComments, postId]);

  const onHideComments = () => {
    setShowComments(prev => !prev);
  };

  const onUpdateComments = () => {
    setUpdateComments(!isUpdateComments);
  };

  const onDeleteComment = (id) => {
    deleteComment(id)
      .then(onUpdateComments);
  };

  const onAddComment = (data, setLoad) => {
    setLoad(true);
    addComment(data)
      .then((response) => {
        setLoad(false);
        onUpdateComments();
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {!isLoad && comments && postDetails
        ? (
          <>
            <section className="PostDetails__post">
              <p>{postDetails.title}</p>
            </section>

            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={onHideComments}
              >
                Hide
                {' '}
                {comments.length}
                {' '}
                {' '}
                comments
              </button>

              <ul className="PostDetails__list">
                {showComments && comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
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
            </section>
          </>
        )
        : <Loader />
      }

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onAddComment={onAddComment}
            postId={postId}
            onUpdateComments={onUpdateComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
