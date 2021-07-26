/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails, getPostComments, deleteComment } from '../../api/api';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [areCommentsVisible, setAreCommentsVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId).then(setPostDetails);
    getPostComments(selectedPostId).then(setPostComments);
  }, [selectedPostId]);

  const onDelete = async(id) => {
    await deleteComment(id);
    getPostComments(selectedPostId).then(setPostComments);
  };

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
              onClick={() => setAreCommentsVisible(!areCommentsVisible)}
            >
              {areCommentsVisible ? 'Hide' : 'Show'}
              {` ${postComments.length} ${postComments.length > 1
                ? 'comments'
                : 'comment'}`}
            </button>

            {areCommentsVisible && (
              <ul className="PostDetails__list">
                {postComments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => onDelete(comment.id)}
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
          <NewCommentForm
            selectedPostId={selectedPostId}
            setPostComments={setPostComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
