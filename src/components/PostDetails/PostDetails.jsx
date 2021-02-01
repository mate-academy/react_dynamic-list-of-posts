import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, removeComment } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({
  selectedPost,
  areCommentsHidden,
  setAreCommentsHidden,
}) => {
  const [postComments, setPostComments] = useState([]);

  function loadPostComments() {
    getPostComments().then((allComments) => {
      setPostComments(
        allComments.filter(com => com.postId === selectedPost.id),
      );
    });
  }

  useEffect(() => {
    loadPostComments();
  }, [selectedPost]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
      </section>

      {(postComments.length === 0)
        ? (
          <p
            className="PostDetails__preloadText"
          >
            There are no comments yet. But you can add some:
          </p>
        )
        : (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button PostDetails__hide-show-button"
              onClick={() => setAreCommentsHidden(state => !state)}
            >
              {`${areCommentsHidden ? 'Hide' : 'Show'} ${postComments.length}`}
              {' '}
              comment
              {
                postComments.length > 1 ? 's' : ''
              }
            </button>

            {areCommentsHidden && (
              <ul className="PostDetails__list">
                {postComments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removeComment(comment.id)
                          .then((data) => {
                            loadPostComments();
                          });
                      }}
                    >
                      X
                    </button>
                    <p>
                      <strong>
                        {comment.name}
                        :
                      </strong>
                      {comment.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPost.id}
            postComments={postComments}
            setPostComments={setPostComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  areCommentsHidden: PropTypes.bool.isRequired,
  setAreCommentsHidden: PropTypes.func.isRequired,
};
