import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { getPost } from '../../api/posts';
import { addComment, getComments, deleteComment } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    if (!postId) {
      setPost(null);

      return;
    }

    Promise.all([getPost(postId), getComments(postId)])
      .then(([loadedPost, loadedComments]) => {
        setPost(loadedPost);
        setComments(loadedComments);
      });
  }, [postId]);

  const addNewComment = (newComment) => {
    addComment(newComment)
      .then(addedCom => setComments(prevCom => [...prevCom, addedCom]));
  };

  const deleteCommentHandler = async(commentId) => {
    deleteComment(commentId)
      .then(() => getComments(postId))
      .then(setComments);
  };

  return (
    <div className="PostDetails">

      {!post ? (
        <h2>Select a post</h2>
      ) : (
        <>
          <h2>Post details:</h2>
          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setVisible(value => !value)}
            >
              {isVisible
                ? `Hide ${comments.length} comments`
                : `Show  ${comments.length} comments`
            }
            </button>
            <ul className="PostDetails__list">
              {isVisible && comments.map(({ id, body }) => (
                <li
                  key={id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteCommentHandler(id)}
                  >
                    X
                  </button>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                onAdd={addNewComment}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
