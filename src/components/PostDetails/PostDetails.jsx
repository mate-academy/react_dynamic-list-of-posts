import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postComments, setPostComments] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [hideComments, setHideComments] = useState(false);

  const handleDelete = async(id) => {
    await deleteComment(id);
    getPostComments(selectedPostId)
      .then(setPostComments);
  };

  const newRenderOfComments = () => {
    getPostComments(selectedPostId)
      .then(setPostComments);
  };

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(setPostComments);

    getPostDetails(selectedPostId)
      .then(setSelectedPost);
  }, [selectedPostId]);

  if (!selectedPost || !postComments) {
    return 'Loading...';
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{selectedPost.title}</h3>
        <p>{selectedPost.body}</p>

      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setHideComments(!hideComments)}
        >
          {
            hideComments
              ? `Show ${postComments.length} comments`
              : `Hide ${postComments.length} comments`
          }
        </button>

        {
          hideComments
          || (
            <ul className="PostDetails__list">
              {postComments.map(item => (
                <li className="PostDetails__list-item" key={item.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => handleDelete(item.id)}
                  >
                    X
                  </button>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            newRenderOfComments={newRenderOfComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
