import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, addComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [isButtonClicked, setButtonClick] = useState(false);
  const [postDetails, setPostDetails] = useState();
  const [postComments, setPostComments] = useState();
  const [commentData, setCommentData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const getDetails = () => {
    getPostDetails(postId).then(setPostDetails);
  };

  const getComments = () => {
    getPostComments(postId).then(setPostComments);
  };

  useEffect(() => {
    getDetails();
    getComments();
  }, [postId]);

  const deleteCommentFromList = (commentId) => {
    deleteComment(commentId)
      .then(getComments);
  };

  const addCommentToList = () => {
    addComment(postId, commentData).then(getComments);
    setCommentData({
      name: '',
      email: '',
      body: '',
    });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetails && (
        <section className="PostDetails__post">
          <h4>
            {postDetails.title}
          </h4>

          <p>
            {postDetails.body}
          </p>
        </section>
      )}

      {}
      <section className="PostDetails__comments">

        {postComments && postComments.length !== 0 && (
          <button
            type="button"
            className="button PostDetails__button"
            onClick={() => setButtonClick(!isButtonClicked)}
          >
            {`${!isButtonClicked ? 'Hide' : 'Show'}
            ${' '}
            ${postComments.length} comments`}
          </button>
        )}

        {postComments && !isButtonClicked && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteCommentFromList(comment.id)}
                >
                  X
                </button>

                <p>
                  {comment.name}
                </p>

                <p>
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addToList={addCommentToList}
            data={commentData}
            setData={setCommentData}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
