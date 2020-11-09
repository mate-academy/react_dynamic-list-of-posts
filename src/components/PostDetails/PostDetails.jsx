import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(details => setPostDetails(details));

    getPostComments(selectedPostId)
      .then(comments => setPostComments(comments));
  }, [selectedPostId]);

  const hideChange = () => {
    setHideComments(!hideComments);
  };

  const addPostComment = (newComment) => {
    setPostComments(state => [...state, newComment]);
  };

  const removePostComment = (commentId) => {
    setPostComments(postComments.filter(comment => comment.id !== commentId));

    removeComment(commentId);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={hideChange}
        >
          {`${hideComments ? 'Hide' : 'View'} ${postComments.length} comments`}
        </button>

        {!hideComments && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removePostComment(comment.id)}
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
            postId={selectedPostId}
            addPostComment={addPostComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
