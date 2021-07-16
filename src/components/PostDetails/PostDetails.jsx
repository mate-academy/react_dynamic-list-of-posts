/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails, getPostComments, deleteComment } from '../../api/api';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState([]);
  const [postComments, setpostComments] = useState([]);
  const [commentsAreVisible, setCommentsAreVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(details => setPostDetails(details.data));
    getPostComments(selectedPostId)
      .then(comments => setpostComments(comments));
  }, [selectedPostId, postComments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length > 0 ? (
          <>
            <h3>Comments</h3>
            <button
              type="button"
              className="button"
              onClick={() => setCommentsAreVisible(!commentsAreVisible)}
            >
              {commentsAreVisible ? 'Hide' : 'Show'}
              {` ${postComments.length} ${postComments.length > 1
                ? 'comments'
                : 'comment'}`}
            </button>

            {commentsAreVisible && (
              <ul className="PostDetails__list">
                {postComments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment.id)}
                    >
                      X
                    </button>
                    {`${comment.name}'s comment:`}
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : <h3>No comments yet</h3>}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm selectedPostId={selectedPostId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
