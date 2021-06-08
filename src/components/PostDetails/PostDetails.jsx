import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader/Loader';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(true);
  
  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => setSelectedPost(result))

    updateComents(selectedPostId)
  }, [selectedPostId]);

  const updateComents = (selectedPostId) => {
    getPostComments()
      .then(result => setComments(
        result.filter(({ postId }) => postId === selectedPostId)
      ))
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {selectedPost && selectedPost.body}
      </section>

      {comments ? (
        <>
          <section className="PostDetails__comments">
          {comments.length === 0
            ? <p>No comments yet</p>
            : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setShowComments(() => !showComments);
                }}
              >
                {showComments
                  ? `Show ${comments.length} comments`
                  : `Hide ${comments.length} comments`
                }
              </button>
            )}
            
            {showComments && (
              <ul className="PostDetails__list">
                {comments && comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        deletePostComment(comment.id)
                          .then(() => updateComents(selectedPostId))
                        }}
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
                updateComents={() => updateComents(selectedPostId)}
              />
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
