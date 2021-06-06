import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
// eslint-disable-next-line max-len
import { addComment, getPostComments, removeComment } from '../../api/comments';
import { getPost } from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    if (!postId) {
      setPost(null);

      return;
    }

    Promise.all([getPost(postId), getPostComments(postId)])
      .then(([loadedPost, loadedComments]) => {
        setPost(loadedPost);
        setComments(loadedComments);
      });
  }, [postId]);

  const removeCommentHandler = async(commentId) => {
    removeComment(commentId)
      .then(() => getPostComments(postId))
      .then(setComments);
  };

  const addNewComment = (newComment) => {
    addComment(newComment)
      .then(addedCom => setComments(prevCom => [...prevCom, addedCom]));
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
              onClick={() => setCommentsVisible(value => !value)}
              className="button"
            >
              {commentsVisible ? 'Hide' : 'Show'}
              {' '}
              {comments.length}
              {' '}
              comments
            </button>

            <ul className="PostDetails__list">
              {commentsVisible && comments.map(({ id, body }) => (
                <li key={id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeCommentHandler(id)}
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
