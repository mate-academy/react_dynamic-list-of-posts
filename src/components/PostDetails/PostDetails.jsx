import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  getPost,
  getPostComments,
  addComment,
  deleteComment,
} from '../../api/posts';

import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState(true);

  const loadComments = () => {
    getPostComments(postId)
      .then(setComments);
  };

  const setNewComments = (comment) => {
    addComment(comment)
      .then(() => loadComments());
  };

  const removeComment = (commentId) => {
    deleteComment(commentId)
      .then(() => loadComments());
  };

  useEffect(() => {
    getPost(postId)
      .then(setPost);
    loadComments();
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {(!post)
        ? `Loading post's details`
        : (
          <>
            <section className="PostDetails__post">
              <p>{post.body}</p>
            </section>
            {comments && (
              <section className="PostDetails__comments">
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setCommentsVisible(visible => !visible);
                  }}
                >
                  {(commentsVisible)
                    ? 'Hide comments'
                    : 'Show comments'
                  }
                </button>
                  {commentsVisible && (
                    <ul className="PostDetails__list">
                      {comments.map(comment => (
                        <li
                          key={comment.id}
                          className="PostDetails__list-item"
                        >
                          <button
                            type="button"
                            className="PostDetails__remove-button button"
                            onClick={() => removeComment(comment.id)}
                          >
                            X
                          </button>
                          <p>{comment.body}</p>
                        </li>
                      ))}
                    </ul>
                  )}
              </section>
            )}

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  postId={postId}
                  setComments={setNewComments}
                />
              </div>
            </section>
          </>
        )
      }
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
