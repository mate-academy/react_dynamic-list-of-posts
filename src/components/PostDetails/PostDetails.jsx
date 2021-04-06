import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  deleteComment,
  getPostComments,
  getPostDetails,
} from '../../api/posts';
import { Loader } from '../Loader';

export const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [isVisibilityComments, setIsVisibilityComments] = useState(false);

  const changeVisibilityComments = () => {
    setIsVisibilityComments(!isVisibilityComments);
  };

  const addCommentInPostDetails = (newComment) => {
    setComments(prevState => [...prevState, newComment]);
  };

  const handlerCommentDelete = (commentId) => {
    deleteComment(commentId);

    setComments(prevState => prevState
      .filter(comment => comment.id !== commentId));
  };

  useEffect(() => {
    getPostDetails(postId)
      .then(setPostDetails);

    getPostComments(postId)
      .then(setComments);
  }, [postId]);

  if (postDetails.length === 0) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.title}</p>
      </section>

      {(comments.length > 0)
        ? (
          <>
            <button
              type="button"
              className="button"
              onClick={changeVisibilityComments}
            >
              {isVisibilityComments
                ? `Show ${comments.length} comments`
                : `Hide ${comments.length} comments`}
            </button>

            <section
              className="PostDetails__comments"
              hidden={isVisibilityComments}
            >
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    key={comment.id}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={event => handlerCommentDelete(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section hidden={isVisibilityComments}>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  addCommentInPostDetails={addCommentInPostDetails}
                  postId={postId}
                />
              </div>
            </section>
          </>
        )
        : <Loader />
      }
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
