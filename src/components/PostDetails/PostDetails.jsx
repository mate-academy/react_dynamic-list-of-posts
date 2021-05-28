import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removePostComment, addPostComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState(null);
  const [commentHidden, setCommentHidden] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(setPost);
    getPostComments(postId)
      .then(setComments);
  }, [postId]);

  const toggleDisplayComment = () => {
    setCommentHidden(!commentHidden);
  };

  const removeCommentHandler = (commentId) => {
    removePostComment(commentId);

    setComments(prev => (
      prev.filter(comment => (
        comment.id !== commentId
      ))
    ));
  };

  const addNewComment = useCallback((comment) => {
    const date = Date.now().toString();
    const newComment = {
      ...comment,
      id: Number(date.substr(date.length - 5)),
    };

    addPostComment(newComment);
    setComments(prev => [
      ...prev,
      newComment,
    ]);
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>{post.title}</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      {comments && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={toggleDisplayComment}
          >
            {commentHidden ? 'Show' : 'Hide'}
            {' '}
            {comments.length}
            {' '}
            comments
          </button>

          {!commentHidden && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeCommentHandler(comment.id)}
                  >
                    &#10006;
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
            postID={postId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
